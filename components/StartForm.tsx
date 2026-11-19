"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitRequest } from "@/app/start/actions";
import type { FormState } from "@/app/auth/actions";

const initial: FormState = {};
export const TOPICS = ["Website", "Member app and sign-in", "Events and volunteer tools", "Not sure yet"];
const GROUPS = ["Club or league", "Nonprofit", "Faith community", "School group", "Cultural association", "Local business", "Something else"];

function Submit() {
  const { pending } = useFormStatus();
  return <button className="btn btn-block" type="submit" disabled={pending}>{pending ? "Sending…" : "Send request"}</button>;
}

export default function StartForm({ topic, name, email }: { topic: string; name?: string; email?: string }) {
  const [state, action] = useActionState(submitRequest, initial);
  if (state.message) {
    return (
      <div className="notice ok big" role="status">
        <h2>Request sent</h2>
        <p>{state.message}</p>
      </div>
    );
  }
  return (
    <form action={action} className="form">
      <div className="field">
        <label htmlFor="s-name">Your name</label>
        <input id="s-name" name="name" type="text" autoComplete="name" defaultValue={name} required />
      </div>
      <div className="field">
        <label htmlFor="s-email">Email</label>
        <input id="s-email" name="email" type="email" autoComplete="email" defaultValue={email} required />
      </div>
      <div className="two">
        <div className="field">
          <label htmlFor="s-group">Your group</label>
          <select id="s-group" name="group" defaultValue="">
            <option value="" disabled>Choose one</option>
            {GROUPS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="s-topic">What do you need?</label>
          <select id="s-topic" name="topic" defaultValue={TOPICS.includes(topic) ? topic : "Not sure yet"}>
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="s-msg">What does your team need to get done?</label>
        <textarea id="s-msg" name="message" rows={5} required maxLength={4000} />
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="s-co">Company</label>
        <input id="s-co" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {state.error && <p className="notice error" role="alert">{state.error}</p>}
      <Submit />
    </form>
  );
}
