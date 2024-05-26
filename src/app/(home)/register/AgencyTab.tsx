"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AgencyStepOne from "./AgencyStepOne";
import { States } from "@/types/auth-types";
import AgencyStepTwo from "./AgencyStepTwo";
import { StageTwoFormData, StageOneFormData } from "@/types/auth-types";
import AgencyStepThree from "./AgencyStepThree";
function AgencyTab() {
  const [step, setStep] = useState<number>(1);
  const [formValues, setFormValues] = useState<States>({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    agency: "",
  });
  console.log(formValues);
  const maxStep = 3;

  const stages = [
    {
      stage: 1,
      component: <AgencyStepOne handleNextStep={handleNextStep} />,
    },
    {
      stage: 2,
      component: <AgencyStepTwo handleNextStep={handleNextStep} />,
    },
    {
      stage: 3,
      component: <AgencyStepThree globalStates={formValues} />,
    },
  ];
  function handleNextStep(data: StageTwoFormData | StageOneFormData) {
    if (step === maxStep) {
      //validate either using components own function or here must set loading state
      setStep(1);
      return;
    }
    //appends formData into the global state
    setFormValues({ ...formValues, ...data });
    //increment the step
    setStep(step + 1);
  }
  return (
    <Card className="bg-white border-none rounded-[.2rem] px-3 py-4">
      <CardContent className="space-y-2">
        {stages
          .filter((componentStage) => componentStage.stage === step)
          ?.map((stage) => stage.component)}
      </CardContent>
    </Card>
  );
}

export default AgencyTab;
