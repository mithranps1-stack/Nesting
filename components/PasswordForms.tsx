"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { requestPasswordReset, updatePassword, type FormState } from "@/app/auth/actions";

const initial: FormState = {};
function Submit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <button className="btn btn-block" type="submit" disabled={pending}>{pending ? "Working…" : children}</button>;
}
function Notice({ state }: { state: FormState }) {
  if (state.error) return <p className="notice error" role="alert">{state.error}</p>;
  if (state.message) return <p className="notice ok" role="status">{state.message}</p>;
  return null;
}

export function ForgotForm() {
  const [state, action] = useActionState(requestPasswordReset, initial);
  return (
    <form action={action} className="form">
      <div className="field">
        <label htmlFor="fp-email">Email</label>
        <input id="fp-email" name="email" type="email" autoComplete="email" required />
      </div>
      <Notice state={state} />
      <Submit>Send reset link</Submit>
      <p className="switch"><Link href="/login">Back to sign in</Link></p>
    </form>
  );
}

export function ResetForm() {
  const [state, action] = useActionState(updatePassword, initial);
  return (
    <form action={action} className="form">
      <div className="field">
        <label htmlFor="rp-new">New password</label>
        <input id="rp-new" name="password" type="password" autoComplete="new-password" minLength={8} required />
        <span className="hint">At least 8 characters.</span>
      </div>
      <div className="field">
        <label htmlFor="rp-confirm">Type it again</label>
        <input id="rp-confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} required />
      </div>
      <Notice state={state} />
      <Submit>Save new password</Submit>
    </form>
  );
}
