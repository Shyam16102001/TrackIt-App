<template>
  <div class="mx-auto p-4">
    <h1 class="mb-6 text-2xl font-bold">Calculators</h1>
    <div
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <CalculatorCard
        v-for="calc in calculators"
        :key="calc.title"
        :title="calc.title"
        :description="calc.description"
        :image="calc.image"
        :link="calc.link"
      />
    </div>
  </div>
</template>

<script setup>
const calculators = [
  {
    title: "SIP",
    description:
      "Calculate how much you need to save or how much you will accumulate with your SIP",
    image: "/images/sip.gif",
    link: "/calculator/sip",
  },
  {
    title: "Lumpsum",
    description:
      "Calculate returns for lumpsum investments to achieve your financial goals",
    image: "/images/lumpsum.gif",
    link: "/calculator/lumpsum",
  },
  {
    title: "SWP",
    description:
      "Calculate your final amount with Systematic Withdrawal Plans (SWP)",
    image: "/images/swp.gif",
    link: "/calculator/swp",
  },
  {
    title: "MF",
    description: "Calculate the returns on your mutual fund investments",
    image: "/images/mf.gif",
    link: "/calculator/sip",
  },
  {
    title: "SSY",
    description:
      "Calculate returns for Sukanya Smariddhi Yojana (SSY) as per your investment",
    image: "/images/ssy.gif",
    link: "/calculator/sip",
  },
  {
    title: "PPF",
    description: "Calculate your returns on Public Provident Fund (PPF)",
    image: "/images/ppf.gif",
    link: "/calculator/sip",
  },
  {
    title: "EPF",
    description: "Calculate returns for your Employee’s Provident Fund (EPF)",
    image: "/images/epf.gif",
    link: "/calculator/sip",
  },
  {
    title: "FD",
    description:
      "Check returns on your fixed deposits (FDs) without any hassle",
    image: "/images/fd.gif",
    link: "/calculator/sip",
  },
];

definePageMeta({
  middleware: ["sanctum-verified"],
});

useSeoMeta({
  title: "Calculator | TrackIt",
});
</script>
