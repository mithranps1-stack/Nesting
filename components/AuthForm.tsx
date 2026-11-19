"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendMagicLink, signIn, signUp, type FormState } from "@/app/auth/actions";

const initial: FormState = {};

function Submit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-block" type="submit" disabled={pending}>
      {pending ? "Working…" : children}
    </button>
  );
}

function Notice({ state }: { state: FormState }) {
  if (state.error) return <p className="notice error" role="alert">{state.error}</p>;
  if (state.message) return <p className="notice ok" role="status">{state.message}</p>;
  return null;
}

export default function AuthForm({ mode, next }: { mode: "login" | "signup"; next?: string }) {
  const [state, action] = useActionState(mode === "login" ? signIn : signUp, initial);
  const [magic, magicAction] = useActionState(sendMagicLink, initial);

  return (
    <div className="auth-stack">
      <form action={action} className="form" noValidate={false}>
        {next ? <input type="hidden" name="next" value={next} /> : null}
        {mode === "signup" && (
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>
        )}
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={mode === "signup" ? 8 : undefined}
            required
          />
          {mode === "signup" && <span className="hint">At least 8 characters.</span>}
        </div>
        <Notice state={state} />
        <Submit>{mode === "login" ? "Sign in" : "Create account"}</Submit>
      </form>

      {mode === "login" && (
        <details className="magic">
          <summary>Email me a sign-in link instead</summary>
          <form action={magicAction} className="form">
            {next ? <input type="hidden" name="next" value={next} /> : null}
            <div className="field">
              <label htmlFor="magic-email">Email</label>
              <input id="magic-email" name="email" type="email" autoComplete="email" required />
            </div>
            <Notice state={magic} />
            <Submit>Send sign-in link</Submit>
          </form>
        </details>
      )}

      <p className="switch">
        {mode === "login" ? (
          <>New to Nesting? <Link href="/signup">Create an account</Link></>
        ) : (
          <>Already have an account? <Link href="/login">Sign in</Link></>
        )}
      </p>
    </div>
  );
}
