import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { investValidationSchema, investInitialValues } from "@/features/invest/schemas/investSchema"
import useAuthStore from "@/features/auth/store/authStore"
import Auth from "@/features/auth/components/Auth"
import Modal from "@/components/common/Modal"

interface InvestFormProps {
  onSubmit: (values: typeof investInitialValues, actions: any) => Promise<void>
  fundraiseStatus: string
  remainingAmount: number
}

const InvestForm: React.FC<InvestFormProps> = ({ onSubmit, fundraiseStatus, remainingAmount }) => {
  const { token, user } = useAuthStore()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const openAuthModal = () => setIsAuthModalOpen(true)
  const closeAuthModal = () => setIsAuthModalOpen(false)

  if (!token || !user?.id) {
    return (
      <>
        <button onClick={openAuthModal} className="btn-primary w-full btn mt-2">
          لطفا وارد شوید
        </button>
        <Modal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          onConfirm={closeAuthModal}
          default_buttons={false}
        >
          <Auth />
        </Modal>
      </>
    )
  }

  return (
    <Formik initialValues={investInitialValues} validationSchema={investValidationSchema} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <div className="flex gap-4">
            <div className="grid shrink-0">
              <div className="text-sm">من قصد دارم</div>
              <div className="font-semibold">تا به میزان</div>
            </div>
            <div className="relative w-full">
              <Field 
                type="number" 
                name="amount" 
                className="rounded-xl input-bordered input w-full flex items-center justify-center text-center pr-16" 
              />
              <button 
                type="button" 
                className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-sm btn-outline" 
                onClick={() => setFieldValue("amount", remainingAmount)}
              >
                حداکثر
              </button>
            </div>
            <img src="/img/tooman.svg" className="size-[40px]" alt="Currency" />
          </div>
          <ErrorMessage name="amount" component="div" className="text-error mt-1" />
          {renderInvestButton(fundraiseStatus, isSubmitting, values.amount > 0)}
        </Form>
      )}
    </Formik>
  )
}

const renderInvestButton = (status: string, isSubmitting: boolean, hasAmount: boolean) => {
  switch (status) {
    case "empty":
    case "live":
      return (
        <button type="submit" className="btn-primary w-full btn mt-2" disabled={isSubmitting || !hasAmount}>
          {isSubmitting ? <span className="loading loading-spinner"></span> : "حمایت کنم"}
        </button>
      )
    case "filled":
    case "withdraw_requested":
    case "withdraw_done":
      return (
        <button type="button" className="btn-disabled w-full btn mt-2" disabled>
          تکمیل شده
        </button>
      )
    case "dead":
      return (
        <button type="button" className="btn-disabled w-full btn mt-2" disabled>
          منقضی شده
        </button>
      )
    case "rejected":
      return (
        <button type="button" className="btn-disabled w-full btn mt-2" disabled>
          رد شده
        </button>
      )
    default:
      return (
        <button type="button" className="btn-disabled w-full btn mt-2" disabled>
          نامشخص
        </button>
      )
  }
}

export default InvestForm