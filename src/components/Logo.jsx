export function Logomark(props) {
  return <img className="h-8 w-auto" src="/favicon.ico" alt="" />
}

export function Logo(props) {
  return (
    <div className="flex items-center justify-center gap-6">
      <img className="h-8 w-auto" src="/favicon.ico" alt="" />
      <span className="font-bold">The Playlist</span>
    </div>
  )
}
