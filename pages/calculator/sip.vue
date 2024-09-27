<template>
  <Tabs default-value="sip" class="w-full">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="sip">SIP</TabsTrigger>
      <TabsTrigger value="lumpsum" @click="router.push('/calculator/lumpsum')"
        >Lumpsum</TabsTrigger
      >
    </TabsList>

    <!-- SIP Content -->
    <TabsContent value="sip">
      <div class="flex flex-col md:flex-row">
        <!-- Sliders -->
        <div class="w-full bg-gray-100 p-4 dark:bg-black md:w-1/3">
          <h3 class="mb-4 text-xl font-semibold">SIP Calculator</h3>

          <!-- Instructions -->
          <div class="mb-4 text-sm text-gray-500">
            Adjust the sliders to calculate your SIP future value. You can also
            type exact values in the boxes.
          </div>

          <!-- Monthly Investment Slider -->
          <div>
            <label class="mb-2 block"
              >Monthly Investment: ₹{{ monthlyInvestment[0] }}</label
            >
            <div class="flex items-center">
              <Slider
                v-model="monthlyInvestment"
                :default-value="5000"
                :min="1000"
                :max="100000"
                :step="1000"
              />
              <Input v-model="monthlyInvestment" class="ml-2 w-20" />
            </div>
          </div>

          <!-- Expected Return Rate Slider -->
          <div class="mt-6">
            <label class="mb-2 block"
              >Expected Return Rate (p.a): {{ returnRate[0] }}%</label
            >
            <div class="flex items-center">
              <Slider
                v-model="returnRate"
                :default-value="12"
                :min="1"
                :max="20"
                :step="0.5"
              />
              <Input v-model="returnRate" class="ml-2 w-20" />
            </div>
          </div>

          <!-- Time Period Slider -->
          <div class="mt-6">
            <label class="mb-2 block"
              >Time Period: {{ timePeriod[0] }} years</label
            >
            <div class="flex items-center">
              <Slider
                v-model="timePeriod"
                :default-value="10"
                :min="1"
                :max="30"
                :step="1"
              />
              <Input v-model="timePeriod" class="ml-2 w-20" />
            </div>
          </div>

          <!-- Key Metrics Section (Moved) -->
          <div class="my-4 rounded-md bg-gray-50 p-4 dark:bg-black">
            <h3 class="mb-4 text-lg font-semibold">Key Metrics</h3>
            <div class="space-y-2 text-sm text-gray-700 dark:text-white">
              <p>
                Total Invested Amount:
                {{ formatCurrency(totalInvestment.toFixed(2)) }}
              </p>
              <p>
                Future Investment Value:
                {{ formatCurrency(futureValueSip.toFixed(2)) }}
              </p>
              <p>
                Total Interest Earned:
                {{ formatCurrency(totalInterestEarnedSip.toFixed(2)) }}
              </p>
              <p>All-Time Rate of Return (RoR): {{ allTimeRorSip }}%</p>
              <p>
                Time to Double Investment: {{ timeToDoubleInvestmentSip }} years
              </p>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div class="w-full p-4 md:w-2/3">
          <h3 class="mb-4 text-xl font-semibold">Results</h3>
          <!-- <div class="container mx-auto p-4">
            <div class="flex flex-col md:grid md:grid-cols-2 md:gap-4">
              <div class="w-full mb-4 md:mb-0">
                <p>Future Investment Value: {{ formatCurrency(futureValueSip.toFixed(2)) }}</p>
              </div>
              <div class="w-full mb-4 md:mb-0">
                <p>Total Interest Earned: {{ formatCurrency(totalInterestEarnedSip.toFixed(2)) }}</p>
              </div>
              <div class="w-full mb-4 md:mb-0">
                <p>Total Invested amount: {{ formatCurrency(totalInvestment.toFixed(2)) }}</p>
              </div>
              <div class="w-full">
                <p>All-Time Rate of Return (RoR): {{ allTimeRorSip }}%</p>
              </div>
            </div>
          </div> -->

          <!-- Toggle for Graph/Table -->
          <div class="mt-4 flex space-x-4">
            <button
              @click="viewMode = 'graph'"
              :class="
                viewMode === 'graph'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-300 dark:text-black'
              "
              class="rounded-md px-4 py-2"
            >
              Graph View
            </button>
            <button
              @click="viewMode = 'table'"
              :class="
                viewMode === 'table'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-300 dark:text-black'
              "
              class="rounded-md px-4 py-2"
            >
              Table View
            </button>
          </div>

          <!-- Conditionally Render Bar Chart or Table -->
          <div v-if="viewMode === 'graph'">
            <BarChart
              :data="chartDataSip"
              index="name"
              :categories="['invested', 'predicted']"
              :y-formatter="
                (tick) => ` ${formatCurrency(tick)}`
              "
              type="stacked"
            />
          </div>
          <div v-else-if="viewMode === 'table'">
            <table class="mt-4 w-full table-auto">
              <thead>
                <tr>
                  <th class="px-4 py-2">Year</th>
                  <th class="px-4 py-2">Invested Amount (₹)</th>
                  <th class="px-4 py-2">Predicted Value (₹)</th>
                  <th class="px-4 py-2">Interest Earned (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in chartDataSip" :key="index">
                  <td class="border px-4 py-2">{{ data.name }}</td>
                  <td class="border px-4 py-2">
                    {{ formatCurrency(data.invested) }}
                  </td>
                  <td class="border px-4 py-2">
                    {{ formatCurrency(data.predicted) }}
                  </td>
                  <td class="border px-4 py-2">
                    {{ formatCurrency(data.predicted - data.invested) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TabsContent>
  </Tabs>
</template>

<script setup>
definePageMeta({
  middleware: ["sanctum-verified"],
});

useSeoMeta({
  title: "SIP | TrackIt",
});

// Variables for sliders (SIP)
const monthlyInvestment = ref([5000]);
const returnRate = ref([12]);
const timePeriod = ref([10]);
// Add a reactive variable to control view mode
const viewMode = ref("graph");
const router = useRouter();

// Variables for sliders (LumpSum)
const lumpsumAmount = ref([100000]);
const lumpsumReturnRate = ref([8]);
const lumpsumTimePeriod = ref([5]);

const totalInvestment = monthlyInvestment.value * 12 * timePeriod.value;

// Compound Interest Formula for SIP
const calculateFutureValueSip = (pmt, rate, time) => {
  const n = 12; // Compounding monthly
  const i = rate / 100 / n;
  return pmt * ((Math.pow(1 + i, time * n) - 1) / i) * (1 + i);
};

// Future value calculation for lumpsum
const calculateFutureValueLumpsum = (principal, rate, time) => {
  const i = rate / 100;
  return principal * Math.pow(1 + i, time);
};

// Computed future value based on the slider inputs for SIP
const futureValueSip = computed(() =>
  calculateFutureValueSip(
    monthlyInvestment.value,
    returnRate.value,
    timePeriod.value,
  ),
);

// Computed future value based on the slider inputs for Lumpsum
const futureValueLumpsum = computed(() =>
  calculateFutureValueLumpsum(
    lumpsumAmount.value,
    lumpsumReturnRate.value,
    lumpsumTimePeriod.value,
  ),
);

// Dynamic bar chart data computed based on futureValue for SIP
const chartDataSip = computed(() => {
  const years = timePeriod.value;
  const totalValue = futureValueSip.value;
  const step = totalValue / years; // Distribute future value over years

  return Array.from({ length: years }, (_, i) => ({
    name: `Year ${i + 1}`,
    invested: monthlyInvestment.value * 12 * (i + 1), // Increase total proportionally by year
    predicted: Number(
      calculateFutureValueSip(
        monthlyInvestment.value,
        returnRate.value,
        i + 1,
      ).toFixed(2),
    ), // Proportional predicted value
  }));
});

// Dynamic bar chart data computed based on futureValue for Lumpsum
const chartDataLumpsum = computed(() => {
  const years = lumpsumTimePeriod.value;
  const totalValue = futureValueLumpsum.value;
  const step = totalValue / years; // Distribute future value over years

  return Array.from({ length: years }, (_, i) => ({
    name: `Year ${i + 1}`,
    invested: lumpsumAmount.value * 1, // Lumpsum amount remains the same
    predicted: calculateFutureValueLumpsum(
      lumpsumAmount.value,
      lumpsumReturnRate.value,
      i + 1,
    ).toFixed(2), // Proportional predicted value
  }));
});

// Compute total interest earned for SIP
const totalInterestEarnedSip = computed(
  () => futureValueSip.value - monthlyInvestment.value * 12 * timePeriod.value,
);

// Calculate all-time rate of return
const allTimeRorSip = computed(() => {
  const totalInvestment = monthlyInvestment.value * 12 * timePeriod.value;
  return (
    ((futureValueSip.value - totalInvestment) / totalInvestment) *
    100
  ).toFixed(2);
});

// Calculate time needed to double the investment using rule of 72
const timeToDoubleInvestmentSip = computed(() =>
  (72 / returnRate.value).toFixed(1),
);
</script>
