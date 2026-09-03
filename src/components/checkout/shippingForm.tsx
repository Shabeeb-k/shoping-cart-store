import { useState } from 'react'
import {
  shippingSchema,
  type ShippingFormValues,
} from '../../schemas/shippingSchemas'

interface ShippingFormProps {
  initialValues: ShippingFormValues
  onBack: () => void
  onSubmit: (data: ShippingFormValues) => void
}

const initialErrors: Partial<
  Record<keyof ShippingFormValues, string>
> = {}

export const ShippingForm = ({
  initialValues,
  onBack,
  onSubmit,
}: ShippingFormProps) => {
  const [formData, setFormData] =
    useState<ShippingFormValues>(initialValues)

  const [errors, setErrors] =
    useState(initialErrors)

  const handleChange = (
    field: keyof ShippingFormValues,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const result =
      shippingSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof ShippingFormValues, string>
      > = {}

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ShippingFormValues

        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      })

      setErrors(fieldErrors)

      return
    }

    setErrors({})
    onSubmit(result.data)
  }

  const inputClass = (
    field: keyof ShippingFormValues,
  ) => `
    w-full rounded-lg border px-3 py-2.5 outline-none
    ${
      errors[field]
        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
        : 'border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900'
    }
  `

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-xl font-bold text-slate-900">
        Shipping information
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Enter your delivery details.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="mb-1 block text-sm font-medium"
          >
            Full name
          </label>

          <input
            id="fullName"
            value={formData.fullName}
            onChange={(event) =>
              handleChange(
                'fullName',
                event.target.value,
              )
            }
            className={inputClass('fullName')}
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(event) =>
              handleChange(
                'email',
                event.target.value,
              )
            }
            className={inputClass('email')}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium"
          >
            Phone number
          </label>

          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(event) =>
              handleChange(
                'phone',
                event.target.value,
              )
            }
            className={inputClass('phone')}
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="mb-1 block text-sm font-medium"
          >
            City
          </label>

          <input
            id="city"
            value={formData.city}
            onChange={(event) =>
              handleChange(
                'city',
                event.target.value,
              )
            }
            className={inputClass('city')}
          />

          {errors.city && (
            <p className="mt-1 text-sm text-red-600">
              {errors.city}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="address"
            className="mb-1 block text-sm font-medium"
          >
            Address
          </label>

          <textarea
            id="address"
            rows={3}
            value={formData.address}
            onChange={(event) =>
              handleChange(
                'address',
                event.target.value,
              )
            }
            className={inputClass('address')}
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="mb-1 block text-sm font-medium"
          >
            Postal code
          </label>

          <input
            id="postalCode"
            value={formData.postalCode}
            onChange={(event) =>
              handleChange(
                'postalCode',
                event.target.value,
              )
            }
            className={inputClass('postalCode')}
          />

          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.postalCode}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Continue to payment summary
        </button>
      </div>
    </form>
  )
}