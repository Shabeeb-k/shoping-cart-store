import type { CheckoutStep } from '../../types/checkout'

interface CheckoutStepperProps {
  currentStep: CheckoutStep
}

const steps = [
  {
    number: 1,
    label: 'Cart Review',
  },
  {
    number: 2,
    label: 'Shipping',
  },
  {
    number: 3,
    label: 'Payment Summary',
  },
]

export const CheckoutStepper = ({
  currentStep,
}: CheckoutStepperProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const active =
            currentStep === step.number

          const completed =
            currentStep > step.number

          return (
            <div
              key={step.number}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                    active || completed
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {completed ? '✓' : step.number}
                </div>

                <span
                  className={`mt-2 hidden text-xs sm:block ${
                    active
                      ? 'font-semibold text-slate-900'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 h-px flex-1 ${
                    currentStep > step.number
                      ? 'bg-slate-900'
                      : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}