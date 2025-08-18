"use client";

import { SiAdidas, SiNewbalance, SiNike, SiPuma, SiZara } from "react-icons/si";

import { Card } from "@/components/ui/card";

interface BrandListProps {
  title: string;
}

const BrandList = ({ title }: BrandListProps) => {
  const brands = [
    { name: "Nike", Icon: SiNike },
    { name: "Adidas", Icon: SiAdidas },
    { name: "Puma", Icon: SiPuma },
    { name: "New Balance", Icon: SiNewbalance },
    { name: "Zara", Icon: SiZara },
  ];

  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div className="flex w-full gap-5 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map(({ name, Icon }) => (
          <div key={name} className="flex min-w-30 flex-col items-center gap-2">
            <Card className="flex w-full items-center justify-center p-6">
              <Icon className="h-10 w-10" />
            </Card>
            <span className="text-sm">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
