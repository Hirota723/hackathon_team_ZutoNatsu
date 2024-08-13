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
// import Header from "@/components/Header";

interface PhotoPostContainerProps {
  form: any;
  onSubmit: any;
}

const PhotoPostPresenter = ({ form, onSubmit }: PhotoPostContainerProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col items-center">
      <Header />

      <p className="text-lg font-bold p-2">写真の投稿</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-4/5 mx-auto"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <div className="bg-[#E3D8C6] p-2 rounded-lg">
                  <FormLabel className="text-lg font-bold">写真</FormLabel>
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
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="bg-[#E3D8C6] p-2 rounded-lg">
                  <FormLabel className="text-lg font-bold">タイトル</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="タイトル"
                      {...field}
                      className="text-lg font-bold"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="bg-[#E3D8C6] p-2 rounded-lg">
                  <FormLabel className="text-lg font-bold">場所</FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between text-lg font-bold"
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
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-center">
            <Button type="submit" className="w-4/5 h-12 text-lg bg-red">
              投稿
            </Button>
          </div>
        </form>
      </Form>

      <Footer />
    </div>
  );
};

export default PhotoPostPresenter;
