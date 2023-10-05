"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "./ui/card";
import { fetchByDateAndCity } from "@/app/apiHandler";
import { toast } from "./ui/use-toast";

export function DatePicker({ city }: { city: string }) {
  const [date, setDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const fetchRows = () => {
    return data.map((item: any, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{item?.datedata?.toString()?.substring(0, 16)}</TableCell>
          <TableCell>{item?.candidatesname}</TableCell>
          <TableCell>{item?.candidatesvotes}</TableCell>
        </TableRow>
      );
    });
  };

  const handleDateChange = (e: any) => {
    setDate(e);
    setIsLoading(true);
    fetchByDateAndCity(e.toISOString().split("T")[0], city)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        toast({ title: err.message, variant: "destructive", duration: 2000 });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span>نتائج الاستطلاع اليومي حسب التاريح</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Loader2 />
        </div>
      ) : (
        <Card>
          <Table>
            <TableCaption>نتائج الاستطلاع حسب التاريخ</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>تاريخ</TableHead>
                <TableHead>المرشحين</TableHead>
                <TableHead>الاصوات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{fetchRows()}</TableBody>
          </Table>
        </Card>
      )}
    </>
  );
}
