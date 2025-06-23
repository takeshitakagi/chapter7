import { useForm, type SubmitHandler } from "react-hook-form";
import { validationSchema } from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ContactFormData } from "../types/ContactFormData";
import { useState } from "react";


function Contact() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(validationSchema),
    mode: "onChange"
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmitStatus('idle');
    setErrorMessage(null);

    try {
      const apiUrl = 'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts';

      // await new Promise(resolve => setTimeout(resolve, 10000));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json,'
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `APIエラー: ${response.status}`);
      }

      setSubmitStatus('success');
      console.log('お問い合わせが正常に送信されました', data);
      alert('お問い合わせを受け付けました！');

      reset();

    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || '送信中に不明なエラーが発生しました。');
      console.error('お問い合わせの送信中にエラーが発生しました:', error);
      alert('お問い合わせの送信に失敗しました。')
    }
  };

  const handleReset = () => {
    reset();
  };


  return (
    <>
      <div class='w-3xl mx-auto mt-4'>
        <h1 class='text-2xl my-10'>お問い合わせフォーム</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div class='flex items-center mb-4'>
            <div class='w-1/4'>
              <label htmlFor="" class=''>お名前</label>
            </div>
            <div class='w-3/4'>
            <input
              type="text"
              class='w-full border border-gray-300 h-10 rounded'
              disabled={isSubmitting}
                {...register("name")}
              />
              <p class='text-red-500 text-sm mt-1'>{errors.name?.message as React.ReactNode}</p>
            </div>
          </div>
          <div class='flex items-center mb-4'>
            <div class='w-1/4'>
              <label htmlFor="" class=''>メールアドレス</label>
            </div>
            <div class='w-3/4'>
              <input
                type="text"
                class='border border-gray-300 w-full h-10 rounded'
                disabled={isSubmitting}
                {...register("email")} />
              <p class='text-red-500 text-sm mt-1'>{errors.email?.message as React.ReactNode}</p>
            </div>
          </div>
          <div class='flex items-center mb-4'>
            <div class='w-1/4'>
              <label htmlFor="" class=''>本文</label>
            </div>
            <div class='w-3/4'>
              <textarea
                name=""
                id=""
                class='border border-gray-300 w-full h-40 rounded'
                disabled={isSubmitting}
                {...register("content")}
              ></textarea>
                <p class='text-red-500 text-sm mt-1'>
                {errors.content?.message as React.ReactNode}</p>
            </div>
          </div>
          <div class='w-3xl mx-auto flex justify-center'>
            <button
              type="submit"
              class='bg-gray-700 py-2 px-4 rounded text-white'
              disabled={isSubmitting}
            >
              {isSubmitting ? '送信中...' : '送信'}</button>
        <button
          type="button"
              class='bg-gray-300 py-2 px-4 rounded ml-4'
              disabled={isSubmitting}
              onClick={handleReset}
            >クリア</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Contact;
