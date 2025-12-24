import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../utils/api";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) return setError("Passwords do not match");
    if (form.password.length < 8) return setError("Password too short");
    setLoading(true);
    try {
      // const res = await api.signup(form);
      console.log("signup", form);
      await new Promise(r => setTimeout(r, 900));
    } catch (err) {
      setError("Failed to create account");
    } finally { setLoading(false); }
  };

  return (
    <motion.form onSubmit={submit} className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <input className="input" name="name" placeholder="Full name" value={form.name} onChange={handle} required />
      <input className="input" name="email" placeholder="Email" value={form.email} onChange={handle} required />
      <input className="input" name="password" placeholder="Password" value={form.password} onChange={handle} type="password" required />
      <input className="input" name="confirm" placeholder="Confirm password" value={form.confirm} onChange={handle} type="password" required />

      {error && <div className="text-sm text-red-600">{error}</div>}

      <motion.button whileTap={{ scale: 0.98 }} className="primary-btn" type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </motion.button>
    </motion.form>
  );
}
