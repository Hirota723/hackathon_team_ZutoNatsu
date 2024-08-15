"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadSpinner from "@/components/LoadSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface PhotoPostContainerProps {
  form: any;
  onSubmit: any;
  startLocationFetch: any;
  isLoading: Boolean;
}

const PhotoPostPresenter = ({
  form,
  onSubmit,
  startLocationFetch,
  isLoading,
}: PhotoPostContainerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false); // 追加: 投稿ボタンが押されたかどうかの状態を管理

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return; // 連打を防止

    setIsSubmitting(true);
    try {
      await form.handleSubmit(onSubmit)(); // 投稿処理を実行
    } finally {
      setIsSubmitting(false); // 処理が完了したら再度ボタンを押せるようにする
    }
  };

  return (
    <div className="flex flex-col items-center pb-20">
      <Header />

      <p className="text-lg font-bold p-2">写真の投稿</p>

      <Form {...form}>
        <form
          onSubmit={handleSubmit} // 修正: handleSubmitを使用
          className="space-y-8  w-full max-w-[600px] p-4"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div className="bg-[#E3D8C6] p-2 rounded-lg">
                  <div className="flex">
                    <FormLabel className="text-lg font-bold">写真</FormLabel>
                    <FormMessage className="ml-auto" />
                  </div>
                  <FormControl>
                    <Input
                      placeholder="写真"
                      id="picture"
                      type="file"
                      accept="image/*"
                      capture="environment"
                      // fieldを使用してreact-hook-formに接続
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file); // field.onChangeを使用してファイルを設定
                        }
                      }}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <div className="bg-[#E3D8C6] rounded-lg">
            <FormField
              control={form.control}
              name="title5"
              render={({ field }) => (
                <FormItem>
                  <div className="bg-[#E3D8C6] p-2 rounded-lg">
                    <div className="flex flex-col">
                      <FormLabel className="text-lg font-bold">俳句</FormLabel>
                      <div className="flex">
                        <FormLabel className="text-base font-semibold">
                          一句 (5音)
                        </FormLabel>
                        <FormMessage className="ml-auto" />
                      </div>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="5音の部分を入力"
                        {...field}
                        className="text-lg font-medium"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title7"
              render={({ field }) => (
                <FormItem>
                  <div className="bg-[#E3D8C6] p-2 rounded-lg">
                    <div className="flex">
                      <FormLabel className="text-base font-semibold">
                        二句 (7音)
                      </FormLabel>
                      <FormMessage className="ml-auto" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="7音の部分を入力"
                        {...field}
                        className="text-lg font-medium"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title5_2"
              render={({ field }) => (
                <FormItem>
                  <div className="bg-[#E3D8C6] p-2 rounded-lg">
                    <div className="flex">
                      <FormLabel className="text-base font-semibold">
                        三句 (5音)
                      </FormLabel>
                      <FormMessage className="ml-auto" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="最後の5音の部分を入力"
                        {...field}
                        className="text-lg font-medium"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <div className="bg-[#E3D8C6] p-2 rounded-lg">
                  <div className="flex">
                    <FormLabel className="text-base font-semibold">
                      場所
                    </FormLabel>
                    <FormMessage className="ml-auto" />
                  </div>
                  <div className="w-2/4 bg-blue my-2 bg-blue rounded-lg flex flex-col items-center">
                    <Button
                      onClick={startLocationFetch}
                      className="bg-blue hover:bg-blue"
                    >
                      {isLoading ? <LoadSpinner /> : "現在地を取得"}
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="場所を入力してください"
                      {...field}
                      value={form.watch("location")}
                      className="text-lg font-medium"
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-4/5 h-12 text-lg text-white flex justify-center items-center rounded-full ${
                isSubmitting ? "bg-red" : "bg-red"
              }`}
              disabled={isSubmitting} // ボタンの無効化
            >
              {isSubmitting ? <LoadSpinner /> : "投稿"}
            </button>
          </div>
        </form>
      </Form>

      <Footer />
    </div>
  );
};

export default PhotoPostPresenter;
