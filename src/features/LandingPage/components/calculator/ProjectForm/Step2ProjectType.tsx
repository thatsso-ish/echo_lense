import { projectTypes } from '../../../constants/calculator/CalculatorData';





function Step2ProjectType({ formData, setFormData }:any) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-white mb-6">Project Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projectTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => setFormData({ ...formData, projectType: type.id })}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              formData.projectType === type.id
                ? 'border-lime-400 bg-lime-400/10'
                : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            <h3 className="text-white font-semibold mb-2">{type.name}</h3>
            <p className="text-gray-400 text-sm">
              Starting from ${type.basePrice.toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
export default Step2ProjectType;