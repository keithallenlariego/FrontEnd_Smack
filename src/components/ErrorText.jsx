// Red-ish message shown under forms when the server says no.
export default function ErrorText({ children }) {
  return children ? <p role="alert" className="text-sm font-medium text-clay">{children}</p> : null;
}
