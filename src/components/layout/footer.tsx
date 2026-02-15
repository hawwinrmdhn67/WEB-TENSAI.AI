export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-6 text-xs text-muted-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="flex flex-wrap items-center gap-4">
          <span>© {year} Tensai</span>

          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            About
          </a>
        </nav>
      </div>
    </footer>
  )
}
