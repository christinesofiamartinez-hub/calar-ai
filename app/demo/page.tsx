export const metadata = { title: "Calar — Interactive Demo" };

export default function DemoPage() {
  return (
    <iframe
      src="/demo.html"
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }}
      title="Calar Interactive Demo"
    />
  );
}
