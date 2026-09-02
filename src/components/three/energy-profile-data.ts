// A synthetic 24-point specific-energy-consumption profile (e.g. one bar per
// hour of a production day). BASE is the measured "before" curve; REDUCED is
// the same profile after an efficiency measure -- the peak-load bars come
// down, which is what the amber-tinted subset in the 3D hero traces.
export const PROFILE_LENGTH = 24

export const BASE_PROFILE = [
  0.35, 0.42, 0.5, 0.58, 0.63, 0.7, 0.78, 0.84, 0.9, 0.95, 0.98, 1.0, 0.97,
  0.9, 0.82, 0.74, 0.66, 0.58, 0.5, 0.44, 0.4, 0.38, 0.36, 0.35,
]

export const REDUCED_PROFILE = BASE_PROFILE.map((value, index) => {
  const inReductionWindow = index >= 6 && index <= 15
  return inReductionWindow ? value * 0.82 : value
})

export const REDUCTION_MASK = BASE_PROFILE.map(
  (value, index) => REDUCED_PROFILE[index] < value
)
