import { Project } from "../../../data/mockProjects";

export default function TeamTab({ project }: { project: Project }) {
  return (
    <div>
      <h2 className="text-2xl font-light text-white mb-6">Project Team</h2>

      {/* Manager */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-lime-400/10 to-emerald-400/10 border border-lime-400/20">
        <p className="text-sm text-gray-400 mb-3">PROJECT MANAGER</p>

        <div className="flex items-center gap-4">
          <img src={project.manager.avatar} className="w-16 h-16 rounded-full" />
          <div>
            <p className="text-white text-lg font-medium">{project.manager.name}</p>
            <p className="text-lime-400">{project.manager.role}</p>
            <p className="text-gray-400 text-sm">{project.manager.specialty}</p>
            <p className="text-gray-500 text-sm mt-1">{project.manager.email}</p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.team.map(member => (
          <div
            key={member.id}
            className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 transition"
          >
            <div className="flex gap-4">
              <img src={member.avatar} className="w-14 h-14 rounded-full" />
              <div>
                <p className="text-white font-medium">{member.name}</p>
                <p className="text-lime-400 text-sm">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.specialty}</p>
                <p className="text-gray-500 text-xs">{member.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
