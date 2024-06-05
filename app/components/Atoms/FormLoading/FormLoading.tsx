import type { FC } from 'react'

interface FormLoadingProps {
  title: string
  description?: string
}

const FormLoading: FC<FormLoadingProps> = ({ title, description }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-dove-300 flex flex-col items-center justify-center z-[9999]">
      {/* <h3 className="h3 text-black font-sans">{title}</h3> */}
      <img src="/assets/snowFlake.gif" className="w-20 h-20" alt="" />
      <p className="text-black font-sans display-m my-8 max-w-[680px] text-center px-4">
        {description}
      </p>
    </div>
  )
}

export default FormLoading
