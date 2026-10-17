import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: "2rem", textAlign: "center" }}>
      <div>
        <p className="mono">Signal lost</p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,6vw,4rem)", margin: "1rem 0" }}>This reality does not exist.</h1>
        <Link className="btn btn-primary" href="/">Return to THE CATACLYSM</Link>
      </div>
    </main>
  );
}
