"use client";
import React, { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import AgencyStepOne from "./AgencyStepOne";
import { FormData } from "@/types/auth-types";
import AgencyStepTwo from "./AgencyStepTwo";
function AgencyTab() {
  const [step, setStep] = useState<number>(1);
  const stages = [
    {
      stage: 1,
      component: <AgencyStepOne handleNextStep={handleNextStep} />,
    },
    {
      stage: 2,
      component: <AgencyStepTwo handleNextStep={handleNextStep} />,
    },
  ];
  const [formValues, setFormValues] = useState<FormData>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    agency: "",
  });
  const maxStep = 3;
  function handleNextStep() {
    if (step === maxStep) {
      //validate either using components own function or here must set loading state
      setStep(1);
      return;
    }
    setStep(step + 1);
  }

  return (
    <Card className="bg-white border-none rounded-[.2rem] p-5">
      <CardContent className="space-y-2"></CardContent>
      {stages
        .filter((componentStage) => componentStage.stage === step)
        ?.map((stage) => stage.component)}
    </Card>
  );
}

export default AgencyTab;
