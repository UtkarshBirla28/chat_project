const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	const options = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
	];
	return (
		<div>
			<label className="mb-1.5 block text-sm font-medium text-base-content/80">Gender</label>
			<div className="grid grid-cols-2 gap-2">
				{options.map((opt) => (
					<button
						key={opt.value}
						type="button"
						onClick={() => onCheckboxChange(opt.value)}
						className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
							selectedGender === opt.value
								? "border-primary bg-primary/15 text-primary"
								: "border-base-content/15 bg-base-200/40 text-base-content/70 hover:border-base-content/30"
						}`}
					>
						{opt.label}
					</button>
				))}
			</div>
		</div>
	);
};
export default GenderCheckbox;
