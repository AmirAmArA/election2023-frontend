"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

import { DatePicker } from "@/components/DatePicker";
import ScrollImages from "../components/ScrollImages";
import Options from "../components/Options";
import BottomImages from "../components/BottomImages";
import { getVotesofCity } from "@/app/apiHandler";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

type Props = {
  city: string;
  votes: any | [];
};

const PageComponent = (props: Props) => {
  const [selectedNumber, setSelectedNumber] = useState<null | number>(null);
  const city = decodeURIComponent(props.city);
  const [dropdownValues, setDropDownValues] = useState<votesData[] | []>([]);

  const handleNumberSelect = (number: any) => {
    setSelectedNumber(number);
  };
  const { toast } = useToast();
  const { theme } = useTheme();

  useEffect(() => {
    getVotesofCity(props?.city)
      .then((adds) => {
        setDropDownValues(adds);
      })
      .catch((error) => {
        toast({ title: error.message, variant: "destructive", duration: 2000 });
      });
    // .finally(() => setIsCitiesLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-14 max-w-[100%]">
        <Card
          className={cn(
            "p-12 flex flex-col space-y-20 min-h-[1300px] lg:w-[60%] w-full  shadow-lg ",
            theme == "light" && "bg-[#FFF3DA]"
          )}
        >
          <p dir="rtl" className="text-center">
            {`استطلاع رأي انتخابات ${decodeURIComponent(props.city)} 2023
`}
          </p>
          <ScrollImages city={city} />
          <Link
            href=" https://forms.gle/sb8q2cpNNK87AuBNA"
            target="_blank"
            className="flex justify-center items-center"
          >
            <Button
              className={cn(
                "flex-[0.2]",
                theme == "light" &&
                  "bg-[#F1F0E8] text-black hover:opacity-20 hover:bg-[#F1F0E8] transition hover:text-black"
              )}
            >
              للإعلان الرجاء الضغط هنا
            </Button>
          </Link>

          <Options
            votes={dropdownValues}
            setVotes={setDropDownValues}
            handleNumberSelect={handleNumberSelect}
            selectedNumber={selectedNumber}
          />
          {/* <BottomImages city={city} /> */}
          <DatePicker city={city} />
        </Card>
      </div>
    </>
  );
};

export default PageComponent;
