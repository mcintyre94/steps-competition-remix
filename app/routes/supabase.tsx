import { Transition } from "@remix-run/react/transition";
import { ApiError, User } from "@supabase/gotrue-js";
import { useEffect, useState } from "react";
import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  useActionData,
  useLoaderData,
  useTransition,
} from "remix";
import { commitSession, destroySession, getSession } from "~/lib/sessions";
import { supabase } from "~/lib/supabaseClient";

type SupabaseData = {
  user: User,
  error: ApiError
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));

  if(session.has("token")) {
    const authToken = session.get("token");
    supabase.auth.setAuth(authToken)

    const { user, error } = await supabase.auth.api.getUser(authToken);
    console.error(error)

    const setCookieHeader = error ? await destroySession(session) : await commitSession(session)
    return json(
      {user, error},
      { headers: {
        "Set-Cookie": setCookieHeader
      }}
    )
  } else {
    return {user: null, error: null}
  }
};

type SupabaseActionData = {
  email: string
  error: string | null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();

  if(email) {
    const { error } = await supabase.auth.signIn({email})
    return json({email, error})
  } else {
    return json({email: "", error: "Email is required"}, { status: 400 });
  }
};

const makeMessage = (actionData: SupabaseActionData | undefined, transition: Transition): string | null => {
  if(actionData) {
    if(actionData.error) return actionData.error 
    return `Sent login link to ${actionData.email}`
  } else if(transition.state == "submitting" || transition.state == "loading") {
    const email = transition.submission?.formData.get("email")
    if(email) return `Sending login link to ${email}`
  }
  return null
}

export default function Supabase() {
  const { user, error } = useLoaderData<SupabaseData>();
  const actionData = useActionData<SupabaseActionData>();
  const transition = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  if(error) {
    console.log(JSON.stringify(error))
    throw error
  }

  useEffect(() => {
    setMessage(makeMessage(actionData, transition))
    console.log(`Made message ${message}`)
  }, [transition])

  const renderSupabase = () => {
    if (user) {
      return (
        <>
          <p>We have a supabase user!</p>
          <p style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(user, null, 2)}</p>
          <button onClick={() => supabase.auth.signOut()}>Log out!</button>
        </>
      )
    } else {
      return (
        <>
          <p>No supabase user yet!</p>
          <Form method="post">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" required></input>

            <button type="submit">Submit</button>
            {message ? <p>{message}</p> : null}
          </Form>
        </>
      );
    }
  };

  return renderSupabase();
}
