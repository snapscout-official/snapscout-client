"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import StepOne from "./AgencyStepOne";
import {
  MerchantStageThree,
  MerchantStageTwo,
  StageOneFormData,
} from "@/types/auth-types";
import MerchantSteptwo from "./MerchantSteptwo";
import MerchantStepThree from "./MerchantStepThree";
import MerchantStepFour from "./MerchantStepFour";
type emptyType = {};
export default function MerchantTab() {
  const [step, setStep] = useState<number>(1);
  const [globalFormValues, setGlobalFormValues] = useState({});
  const maxStage = 4;
  const stages = [
    {
      component: <StepOne key={1} handleNextStep={handleNextStep} />,
      stage: 1,
    },
    {
      component: <MerchantSteptwo key={2} handleNextStep={handleNextStep} />,
      stage: 2,
    },
    {
      component: <MerchantStepThree key={3} handleNextStep={handleNextStep} />,
      stage: 3,
    },
    {
      component: (
        <MerchantStepFour key={4} globalFormValues={globalFormValues} />
      ),
      stage: 4,
    },
  ];
  function handleNextStep(
    formData: StageOneFormData | MerchantStageTwo | MerchantStageThree,
  ) {
    if (step >= maxStage) {
      throw new Error("Cannot go beyond last stage");
    }
    setGlobalFormValues({ ...globalFormValues, ...formData });
    setStep(step + 1);
    return;
  }
  return (
    <Card className="bg-[#F1F5F9] border-none rounded-[.2rem] px-3 py-4">
      <CardContent className="space-y-2">
        {stages
          .filter((componentStage) => componentStage.stage === step)
          ?.map((stage) => stage.component)}
      </CardContent>
    </Card>
  );
}
