<template>
  <Tabs default-value="lumpsum" class="w-full">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="sip" @click="router.push('/calculator/sip')"
        >SIP</TabsTrigger
      >
      <TabsTrigger value="lumpsum">Lumpsum</TabsTrigger>
    </TabsList>

    <TabsContent value="lumpsum">
      <div class="flex">
        <!-- Left Section - Sliders for Lumpsum -->
        <div class="w-1/3 bg-gray-100 p-4 dark:bg-black">
          <h3 class="mb-4 text-xl font-semibold">Lumpsum Calculator</h3>

          <!-- Lumpsum Amount Slider -->
          <div>
            <label class="mb-2 block"
              >Lumpsum Amount: ₹{{ lumpsumAmount[0] }}</label
            >
            <div class="flex items-center">
              <Slider
                v-model="lumpsumAmount"
                :default-value="100000"
                :min="10000"
                :max="10000000"
                :step="1000"
              />
              <Input v-model="lumpsumAmount[0]" class="ml-2 w-20" @input="updateLumpsumAmount" />
            </div>
          </div>

          <!-- Expected Return Rate Slider -->
          <div class="mt-6">
            <label class="mb-2 block"
              >Expected Return Rate (p.a): {{ lumpsumReturnRate[0] }}%</label
            >
            <div class="flex items-center">
              <Slider
                v-model="lumpsumReturnRate"
                :default-value="8"
                :min="1"
                :max="20"
                :step="0.5"
              />
              <Input v-model="lumpsumReturnRate[0]" class="ml-2 w-20" @input="updateLumpsumReturnRate"/>
            </div>
          </div>

          <!-- Time Period Slider for Lumpsum -->
          <div class="mt-6">
            <label class="mb-2 block"
              >Time Period: {{ lumpsumTimePeriod[0] }} years</label
            >
            <div class="flex items-center">
              <Slider
                v-model="lumpsumTimePeriod"
                :default-value="5"
                :min="1"
                :max="30"
                :step="1"
              />
              <Input v-model="lumpsumTimePeriod[0]" class="ml-2 w-20" @input="updateLumpsumTimePeriod" />
            </div>
          </div>
        </div>

        <!-- Right Section - Results and Chart for Lumpsum -->
        <div class="w-2/3 p-4">
          <h3 class="mb-4 text-xl font-semibold">Results</h3>
          <div class="container mx-auto p-4">
            <div class="flex flex-col md:grid md:grid-cols-2 md:gap-4">
              <div class="mb-4 w-full md:mb-0">
                <p>
                  Future Investment Value:
                  {{ formatCurrency(futureValueLumpsum.toFixed(2)) }}
                </p>
              </div>
              <!-- <div class="w-full mb-4 md:mb-0">
                <p>Total Interest Earned: {{ formatCurrency(allTimeRorLS.toFixed(2)) }}</p>
              </div> -->
              <div class="mb-4 w-full md:mb-0">
                <p>
                  Initial balance:
                  {{ formatCurrency(lumpsumAmount[0]) }}
                </p>
              </div>
              <div class="mb-4 w-full md:mb-0">
                <p>
                  Time to Double Investment:
                  {{ timeToDoubleInvestment }} years
                </p>
              </div>
              <div class="w-full">
                <p>All-Time Rate of Return (RoR): {{ allTimeRorLS }}%</p>
              </div>
            </div>
          </div>
          <!-- Toggle for Graph/Table -->
          <div class="mt-4 flex space-x-4">
            <button
              @click="viewMode = 'graph'"
              :class="
                viewMode === 'graph' ? 'bg-gray-800 text-white' : 'bg-gray-300'
              "
              class="rounded-md px-4 py-2"
            >
              Graph View
            </button>
            <button
              @click="viewMode = 'table'"
              :class="
                viewMode === 'table' ? 'bg-gray-800 text-white' : 'bg-gray-300'
              "
              class="rounded-md px-4 py-2"
            >
              Table View
            </button>
          </div>

          <!-- Conditionally Render Bar Chart or Table -->
          <div v-if="viewMode === 'graph'">
            <BarChart
              :data="chartDataLumpsum"
              index="name"
              :categories="['invested', 'predicted']"
              :colors="['#4ADE80', '#000000']"
              show-grid
              show-y-axis
              grid-color="gray"
              :rounded-corners="4"
              :bar-width="4"
              :bar-padding="4"
              :y-formatter="
                (tick) => ` ${formatCurrency(tick)}`
              "
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
                <tr v-for="(data, index) in chartDataLumpsum" :key="index">
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

          <!-- Key Metrics
          <div class="mt-6 flex flex-col space-y-4">
            <div class="bg-gray-50 p-4 rounded-md">
              <h3 class="text-lg font-semibold">Key Metrics</h3>
              <p>Total Interest Earned: {{ formatCurrency(totalInterestEarnedSip.toFixed(2)) }}</p>
              <p>All-Time Rate of Return (RoR): {{ allTimeRorSip }}%</p>
              <p>Time to Double Investment: {{ timeToDoubleInvestmentSip }} years</p>
            </div>
          </div> -->
        </div>
        <!-- <div class="w-2/3 p-4">
            <h3 class="text-xl font-semibold mb-4">Results</h3>
            <p>Future Investment Value: ₹{{ formatCurrency(futureValueLumpsum.toFixed(2)) }}</p>
            <BarChart :data="chartDataLumpsum" index="name" :categories="['invested', 'predicted']" :y-formatter="(tick) => ` ${new Intl.NumberFormat('en-IN').format(tick)}`" />
          </div> -->
      </div>
    </TabsContent>
  </Tabs>
</template>

<script setup>
definePageMeta({
  middleware: ["sanctum-verified"],
});

useSeoMeta({
  title: "Lumpsum | TrackIt",
});
// Variables for sliders (LumpSum)
const lumpsumAmount = ref([100000]);
const lumpsumReturnRate = ref([8]);
const lumpsumTimePeriod = ref([5]);

const viewMode = ref("table");
const router = useRouter();

const updateLumpsumAmount = (event) => {
  // Coerce input value to number
  lumpsumAmount[0] = Number(event.target.value);
};

const updateLumpsumReturnRate = (event) => {
  // Coerce input value to number
  lumpsumReturnRate[0] = Number(event.target.value);
};

const updateLumpsumTimePeriod = (event) => {
  // Coerce input value to number
  lumpsumTimePeriod[0] = Number(event.target.value);
};

// Future value calculation for lumpsum
const calculateFutureValueLumpsum = (principal, rate, time) => {
  const i = rate / 100;
  return principal * Math.pow(1 + i, time);
};

// Computed future value based on the slider inputs for Lumpsum
const futureValueLumpsum = computed(() =>
  calculateFutureValueLumpsum(
    lumpsumAmount.value,
    lumpsumReturnRate.value,
    lumpsumTimePeriod.value,
  ),
);

// Dynamic bar chart data computed based on futureValue for Lumpsum
const chartDataLumpsum = computed(() => {
  const years = lumpsumTimePeriod.value;
  const totalValue = futureValueLumpsum.value;
  const step = totalValue / years; // Distribute future value over years

  return Array.from({ length: years }, (_, i) => ({
    name: `Year ${i + 1}`,
    invested: lumpsumAmount.value * 1, // Lumpsum amount remains the same
    predicted: Number(
      calculateFutureValueLumpsum(
        lumpsumAmount.value,
        lumpsumReturnRate.value,
        i + 1,
      ).toFixed(0),
    ), // Proportional predicted value
  }));
});

// Calculate all-time rate of return
const allTimeRorLS = computed(() => {
  return (
    ((futureValueLumpsum.value - lumpsumAmount.value) / lumpsumAmount.value) *
    100
  ).toFixed(2);
});

// Calculate time needed to double the investment using rule of 72
const timeToDoubleInvestment = computed(() => (72 / lumpsumReturnRate.value).toFixed(1))
</script>
