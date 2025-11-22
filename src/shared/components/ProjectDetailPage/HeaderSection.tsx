export default function HeaderSection({ project }:any) {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-zinc-800" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-12">
        <h1 className="text-6xl md:text-7xl text-white font-light mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl">{project.description}</p>
      </div>
    </div>
  );
}
