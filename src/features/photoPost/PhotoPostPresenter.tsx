"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { LOCATIONS } from "@/constants/locations";

interface PhotoPostContainerProps {
  form: any;
  onSubmit: any;
}

const PhotoPostPresenter = ({ form, onSubmit }: PhotoPostContainerProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
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
          className="space-y-8  w-full max-w-[600px]"
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
              <FormItem className="flex flex-col">
                <div className="bg-[#E3D8C6] p-2 rounded-lg">
                  <div className="flex">
                    <FormLabel className="text-lg font-bold">場所</FormLabel>
                    <FormMessage className="ml-auto" />
                  </div>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between text-lg font-medium"
                      >
                        {value
                          ? LOCATIONS.find(
                              (location) => location.value === value
                            )?.label
                          : "場所を選択..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="場所を選択..." />
                        <CommandList>
                          <CommandEmpty>場所が見つかりません。</CommandEmpty>
                          <CommandGroup>
                            {LOCATIONS.map((location) => (
                              <CommandItem
                                key={location.value}
                                value={location.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  field.onChange(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    value === location.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {location.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-4/5 h-12 text-lg bg-red"
              disabled={isSubmitting} // 追加: ボタンの無効化
            >
              {isSubmitting ? "投稿中..." : "投稿"}
            </Button>
          </div>
        </form>
      </Form>

      <Footer />
    </div>
  );
};

export default PhotoPostPresenter;
