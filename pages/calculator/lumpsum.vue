<template>
    <Tabs default-value="lumpsum" class="w-full">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="sip">SIP</TabsTrigger>
        <TabsTrigger value="lumpsum">Lumpsum</TabsTrigger>
      </TabsList>
      
      <TabsContent value="sip">
        <div class="flex">
          <!-- Left Section - Sliders for SIP -->
          <div class="w-1/3 p-4 bg-gray-100">
            <h3 class="text-xl font-semibold mb-4">SIP Calculator</h3>
            
            <!-- Monthly Investment Slider -->
            <div>
              <label class="block mb-2">Monthly Investment: ₹{{ monthlyInvestment[0] }}</label>
              <div class="flex items-center">
                <Slider v-model="monthlyInvestment" :default-value="25000" :min="1000" :max="100000" :step="1000" />
                <Input v-model="monthlyInvestment" class="ml-2 w-20" />
              </div>
            </div>
            
            <!-- Expected Return Rate Slider -->
            <div class="mt-6">
              <label class="block mb-2">Expected Return Rate (p.a): {{ returnRate[0] }}%</label>
              <div class="flex items-center">
                <Slider v-model="returnRate" :default-value="12" :min="1" :max="20" :step="0.5" />
                <Input v-model="returnRate" class="ml-2 w-20" />
              </div>
            </div>
            
            <!-- Time Period Slider -->
            <div class="mt-6">
              <label class="block mb-2">Time Period: {{ timePeriod[0] }} years</label>
              <div class="flex items-center">
                <Slider v-model="timePeriod" :default-value="10" :min="1" :max="30" :step="1" />
                <Input v-model="timePeriod" class="ml-2 w-20" />
              </div>
            </div>
          </div>
  
          <!-- Right Section - Results and Chart for SIP -->
          <div class="w-2/3 p-4">
            <h3 class="text-xl font-semibold mb-4">Results</h3>
            <p>Future Investment Value: ₹{{ futureValueSip.toFixed(2) }}</p>
            <!-- Display more results if needed -->
            <BarChart :data="chartDataSip" index="name" :categories="['invested', 'predicted']" :y-formatter="(tick) => ` ${new Intl.NumberFormat('en-IN').format(tick)}`" />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="lumpsum">
        <div class="flex">
          <!-- Left Section - Sliders for Lumpsum -->
          <div class="w-1/3 p-4 bg-gray-100">
            <h3 class="text-xl font-semibold mb-4">Lumpsum Calculator</h3>
            
            <!-- Lumpsum Amount Slider -->
            <div>
              <label class="block mb-2">Lumpsum Amount: ₹{{ lumpsumAmount[0] }}</label>
              <div class="flex items-center">
                <Slider v-model="lumpsumAmount" :default-value="100000" :min="10000" :max="1000000" :step="1000" />
                <Input v-model="lumpsumAmount" class="ml-2 w-20" />
              </div>
            </div>
            
            <!-- Expected Return Rate Slider -->
            <div class="mt-6">
              <label class="block mb-2">Expected Return Rate (p.a): {{ lumpsumReturnRate[0] }}%</label>
              <div class="flex items-center">
                <Slider v-model="lumpsumReturnRate" :default-value="8" :min="1" :max="20" :step="0.5" />
                <Input v-model="lumpsumReturnRate" class="ml-2 w-20" />
              </div>
            </div>
            
            <!-- Time Period Slider for Lumpsum -->
            <div class="mt-6">
              <label class="block mb-2">Time Period: {{ lumpsumTimePeriod[0] }} years</label>
              <div class="flex items-center">
                <Slider v-model="lumpsumTimePeriod" :default-value="5" :min="1" :max="30" :step="1" />
                <Input v-model="lumpsumTimePeriod" class="ml-2 w-20" />
              </div>
            </div>
          </div>
  
          <!-- Right Section - Results and Chart for Lumpsum -->
          <div class="w-2/3 p-4">
            <h3 class="text-xl font-semibold mb-4">Results</h3>
            <p>Future Investment Value: ₹{{ futureValueLumpsum.toFixed(2) }}</p>
            <!-- Display more results if needed -->
            <BarChart :data="chartDataLumpsum" index="name" :categories="['invested', 'predicted']" :y-formatter="(tick) => ` ${new Intl.NumberFormat('en-IN').format(tick)}`" />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { Slider } from '@/components/ui/slider'
  import { Input } from '@/components/ui/input'
  import { BarChart } from '@/components/ui/chart-bar'
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from '@/components/ui/tabs'
  
  // Variables for sliders (SIP)
  const monthlyInvestment = ref([5000])
const returnRate = ref([12])
const timePeriod = ref([10])
  
  // Variables for sliders (LumpSum)
  const lumpsumAmount = ref([100000])
  const lumpsumReturnRate = ref([8])
  const lumpsumTimePeriod = ref([5])
  
  // Compound Interest Formula for SIP
  const calculateFutureValueSip = (pmt, rate, time) => {
    const n = 12; // Compounding monthly
    const i = rate / 100 / n;
    return pmt * ((Math.pow(1 + i, time * n) - 1) / i) * (1 + i);
  }
  
  // Future value calculation for lumpsum
  const calculateFutureValueLumpsum = (principal, rate, time) => {
    const i = rate / 100;
    return principal * Math.pow(1 + i, time);
  }
  
  // Computed future value based on the slider inputs for SIP
  const futureValueSip = computed(() => calculateFutureValueSip(monthlyInvestment.value, returnRate.value, timePeriod.value))
  
  // Computed future value based on the slider inputs for Lumpsum
  const futureValueLumpsum = computed(() => calculateFutureValueLumpsum(lumpsumAmount.value, lumpsumReturnRate.value, lumpsumTimePeriod.value))
  
  // Dynamic bar chart data computed based on futureValue for SIP
  const chartDataSip = computed(() => {
    const years = timePeriod.value
    const totalValue = futureValueSip.value
    const step = totalValue / years // Distribute future value over years
  
    return Array.from({ length: years }, (_, i) => ({
      name: `Year ${i + 1}`,
      invested: monthlyInvestment.value * 12 * (i + 1), // Increase total proportionally by year
      predicted: (calculateFutureValueSip(monthlyInvestment.value, returnRate.value, (i + 1))).toFixed(2), // Proportional predicted value
    }))
  })
  
  // Dynamic bar chart data computed based on futureValue for Lumpsum
  const chartDataLumpsum = computed(() => {
    const years = lumpsumTimePeriod.value
    const totalValue = futureValueLumpsum.value
    const step = totalValue / years // Distribute future value over years
  
    return Array.from({ length: years }, (_, i) => ({
      name: `Year ${i + 1}`,
      invested: lumpsumAmount.value * 1, // Lumpsum amount remains the same
      predicted: (calculateFutureValueLumpsum(lumpsumAmount.value, lumpsumReturnRate.value, (i + 1))).toFixed(2), // Proportional predicted value
    }))
  })
  </script>
  