export default function Footer() {
  return (
    <footer className="py-6 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-7xl justify-between px-6">
        <p>© {new Date().getFullYear()} Tensai</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">About</a>
        </div>
      </div>
    </footer>
  )
}
