import { useEffect, useRef, useState } from 'react'

const TRACK_SRC = encodeURI('/Каспийский Груз - Доедешь-Пиши(минус).mp3')

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch (error) {
      console.warn('Ошибка воспроизведения трека:', error)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={TRACK_SRC} loop preload="auto" />
      <button
        type="button"
        onClick={toggleMusic}
        className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-brand-500/40 transition hover:bg-brand-400"
        aria-label={isPlaying ? 'Остановить музыку' : 'Включить музыку'}
      >
        {isPlaying ? 'Музыка: Вкл' : 'Музыка: Выкл'}
      </button>
    </div>
  )
}
