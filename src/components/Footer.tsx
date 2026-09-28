export default function Footer() {
  return (
    <footer className="text-center text-xs text-muted-foreground py-6">
      © {new Date().getFullYear()} Clean My Text. Built with React, TypeScript & Tailwind.
    </footer>
  );
}