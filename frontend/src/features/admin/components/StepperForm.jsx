import React, { useState } from "react";
import { HiCheck } from "react-icons/hi2";

/**
 * The shell every admin form is built on: a numbered rail on the left, one step
 * of fields on the right, and Cancel / Back / Next / Save in the footer.
 *
 * Only the active step is mounted, so a `required` field on another step can
 * never block submit from a page the admin cannot see. A form with a single
 * step drops the rail entirely — there is nothing to navigate.
 */
const StepperForm = ({ title, steps, submitLabel, onSubmit, onCancel }) => {
  const [activeStep, setActiveStep] = useState(0);
  const step = steps[Math.min(activeStep, steps.length - 1)];
  const isLastStep = activeStep >= steps.length - 1;
  const hasRail = steps.length > 1;

  const handleSubmit = (event) => {
    // `goToStep` is handed to the caller so a failed check can reveal the field.
    onSubmit(event, setActiveStep);
  };

  // The negative margin cancels the dashboard's gutter and the height fills what
  // is left of the viewport below the 72px top bar, so the panel sits edge to
  // edge with no space around it and the footer rests on the bottom of the
  // screen whether the form is long or short.
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border-y border-gray-200 overflow-hidden -m-6 md:-m-8 h-[calc(100vh-72px)] flex flex-col"
    >
      {/* The body takes the height left over by the footer; inside it the step
          rail stays put and only the fields scroll. `min-h-0` lets these flex
          children shrink instead of stretching past the panel. */}
      <div
        className={`flex-1 min-h-0 overflow-y-auto ${hasRail ? "lg:flex lg:overflow-hidden" : ""
          }`}
      >
        {hasRail && (
          <aside className="border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50/60 px-6 py-7 lg:w-[260px] lg:shrink-0 lg:flex lg:flex-col lg:overflow-hidden">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
            {/* Only the step list scrolls, so the form's name stays visible. */}
            <ol className="space-y-1 lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:-mr-2 lg:pr-2">
              {steps.map((item, index) => {
                const isActive = index === activeStep;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left text-sm transition-colors ${isActive
                        ? "bg-white border border-gray-200 font-semibold text-gray-900"
                        : "border border-transparent text-gray-500 hover:bg-white/70"
                        }`}
                    >
                      <span
                        className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${isActive
                          ? "bg-[#1F2853] text-white"
                          : "border border-gray-300 text-gray-500"
                          }`}
                      >
                        {index + 1}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>
        )}

        <div className="px-6 py-7 lg:flex-1 lg:min-w-0 lg:overflow-y-auto">
          {!hasRail && <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>}
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">
            {step.label}
          </p>
          {step.render()}
        </div>
      </div>

      <div className="shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50/60 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-sm border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-colors"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          {hasRail && (
            <span className="hidden sm:block text-xs font-semibold text-gray-500">
              Step {activeStep + 1} of {steps.length}
            </span>
          )}
          {activeStep > 0 && (
            <button
              type="button"
              onClick={() => setActiveStep((current) => current - 1)}
              className="px-5 py-2.5 rounded-sm border border-gray-300 text-gray-600 hover:bg-gray-100 text-sm font-semibold transition-colors"
            >
              Back
            </button>
          )}
          {/* Saving is only offered on the final step, so the form is never
              submitted half filled from an earlier one. */}
          {isLastStep ? (
            <button
              type="submit"
              className="bg-[#1F2853] hover:bg-[#2b366b] px-6 py-2.5 rounded-sm font-bold text-sm text-white flex items-center gap-2 transition-colors"
            >
              <HiCheck className="w-4 h-4" />
              {submitLabel}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveStep((current) => current + 1)}
              className="bg-[#1F2853] hover:bg-[#2b366b] px-6 py-2.5 rounded-sm font-bold text-sm text-white transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default StepperForm;
