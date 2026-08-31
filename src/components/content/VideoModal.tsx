import { Modal } from '../ui/overlay'

export function VideoModal({
  open,
  onClose,
  youtubeId,
  title,
}: {
  open: boolean
  onClose: () => void
  youtubeId: string | null
  title?: string
}) {
  return (
    <Modal open={open && !!youtubeId} onClose={onClose} label={title || 'مشغّل الفيديو'} className="max-w-4xl">
      <div className="aspect-video w-full bg-black">
        {youtubeId && (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title || 'فيديو المشروع'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {title && <div className="bg-card p-4 text-sm font-medium">{title}</div>}
    </Modal>
  )
}
