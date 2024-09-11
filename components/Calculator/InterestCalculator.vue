<template>
    <CalculatorCardWrapper title="Interest Calculator" label="Calculate Compound or Simple Interest">
      <form @submit="onSubmit">
        <!-- Principal Amount -->
        <FormField name="principal" class="form-group">
          <FormItem>
            <FormLabel>Principal Amount</FormLabel>
            <FormControl>
              <Input type="number" v-model="form.principal" placeholder="Enter Principal Amount" class="input-field" />
            </FormControl>
          </FormItem>
        </FormField>
  
        <!-- Rate of Interest -->
        <FormField name="rate" class="form-group">
          <FormItem>
            <FormLabel>Rate of Interest (%)</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" v-model="form.rate" placeholder="Enter Rate" class="input-field" />
            </FormControl>
          </FormItem>
        </FormField>
  
        <!-- Rate Type -->
        <FormField name="rateType" class="form-group">
          <FormItem>
            <FormLabel>Rate Type</FormLabel>
            <FormControl>
              <Select v-model="form.rateType">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Please select Rate Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rate Type</SelectLabel>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>
  
        <!-- Compound Frequency -->
        <FormField name="frequency" class="form-group">
          <FormItem>
            <FormLabel>Compound Frequency</FormLabel>
            <FormControl>
              <Select v-model="form.frequency">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Please select Compound Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Frequency</SelectLabel>
                    <SelectItem value="365">Daily</SelectItem>
                    <SelectItem value="52">Weekly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="1">Yearly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        </FormField>
  
        <!-- Time Period (Years and Months) -->
        <div class="flex space-x-4">
          <FormField name="years" class="form-group form-group-half">
            <FormItem>
              <FormLabel>Years</FormLabel>
              <FormControl>
                <Input type="number" v-model="form.years" placeholder="Years" class="input-field" />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField name="months" class="form-group form-group-half">
            <FormItem>
              <FormLabel>Months</FormLabel>
              <FormControl>
                <Input type="number" v-model="form.months" placeholder="Months" class="input-field" />
              </FormControl>
            </FormItem>
          </FormField>
        </div>
  
        <!-- Additional Contributions -->
        <FormField name="contributionType" class="form-group">
          <FormItem>
            <FormLabel>Additional Contributions (Optional)</FormLabel>
            <FormControl>
              <RadioGroup v-model="form.contributionType">
                <div class="flex items-center space-x-4">
                  <RadioGroupItem value="none" /> <Label>None</Label>
                  <RadioGroupItem value="deposit" /> <Label>Deposits</Label>
                  <RadioGroupItem value="withdrawal" /> <Label>Withdrawals</Label>
                  <RadioGroupItem value="both" /> <Label>Both</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        </FormField>
  
        <!-- Conditional Fields Based on Contribution Type -->
        <div v-if="form.contributionType !== 'none'">
          <!-- Deposit Fields -->
          <div v-if="form.contributionType === 'deposit' || form.contributionType === 'both'">
            <FormField name="depositAmount" class="form-group">
              <FormItem>
                <FormLabel>Deposit Amount</FormLabel>
                <FormControl>
                  <Input type="number" v-model="form.depositAmount" placeholder="Deposit Amount" class="input-field" />
                </FormControl>
              </FormItem>
            </FormField>
  
            <FormField name="depositFrequency" class="form-group">
              <FormItem>
                <FormLabel>Deposit Frequency</FormLabel>
                <FormControl>
                  <Select v-model="form.depositFrequency">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Please select Deposit Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Frequency</SelectLabel>
                        <SelectItem value="365">Daily</SelectItem>
                        <SelectItem value="52">Weekly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="1">Yearly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            </FormField>
          </div>
  
          <!-- Withdrawal Fields -->
          <div v-if="form.contributionType === 'withdrawal' || form.contributionType === 'both'">
            <FormField name="withdrawalAmount" class="form-group">
              <FormItem>
                <FormLabel>Withdrawal Amount</FormLabel>
                <FormControl>
                  <Input type="number" v-model="form.withdrawalAmount" placeholder="Withdrawal Amount" class="input-field" />
                </FormControl>
              </FormItem>
            </FormField>
  
            <FormField name="withdrawalFrequency" class="form-group">
              <FormItem>
                <FormLabel>Withdrawal Frequency</FormLabel>
                <FormControl>
                  <Select v-model="form.withdrawalFrequency">
                    <SelectTrigger class="w-full">
                      <SelectValue placeholder="Please select Withdrawal Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Frequency</SelectLabel>
                        <SelectItem value="365">Daily</SelectItem>
                        <SelectItem value="52">Weekly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="1">Yearly</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            </FormField>
          </div>
        </div>
  
        <!-- Submit Button -->
        <div class="mt-6 flex justify-center">
          <Button type="submit" :disabled="isLoading" class="submit-button">
            <span v-if="!isLoading">Calculate</span>
            <span v-else>Loading...</span>
          </Button>
        </div>
  
        <!-- Results -->
        <div v-if="calculated" class="mt-6 results-container">
          <p class="text-lg font-semibold">Future Value: {{ formatCurrency(futureValue) }}</p>
          <p class="text-lg font-semibold">Total Interest Earned: {{ formatCurrency(totalInterest) }}</p>
          <p class="text-lg font-semibold">Additional Deposits: {{ formatCurrency(additionalDeposit) }}</p>
          <p class="text-lg font-semibold">Total Withdrawal Value: {{ formatCurrency(totalWithdrawal) }}</p>
        </div>
      </form>
    </CalculatorCardWrapper>
  </template>
  
  



  <script setup>
  import { ref } from 'vue';
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
  } from '@/components/ui/select';
  import { Label } from '@/components/ui/label';
  import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
  
  const formatCurrency = (value, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(value);
  };
  
  const form = ref({
    principal: null,
    rate: null,
    rateType: '', // Show placeholder
    frequency: '', // Show placeholder
    years: 0,
    months: 0,
    contributionType: 'none',
    depositAmount: null,
    depositFrequency: '', // Show placeholder
    withdrawalAmount: null,
    withdrawalFrequency: '', // Show placeholder
  });
  
  const isLoading = ref(false);
  const calculated = ref(false);
  const futureValue = ref(0);
  const totalInterest = ref(0);
  const totalWithdrawal = ref(0);
  const additionalDeposit = ref(0);
  
  const validateForm = () => {
    if (
      !form.value.principal ||
      !form.value.rate ||
      !form.value.rateType ||
      !form.value.frequency
    ) {
      alert('Please fill out all required fields.');
      return false;
    }
    return true;
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
  
    isLoading.value = true;
    calculated.value = false;
  
    const principal = parseFloat(form.value.principal);
    const rate = parseFloat(form.value.rate) / 100;
    const years = parseFloat(form.value.years) + parseFloat(form.value.months) / 12;
    const compoundFreq = parseInt(form.value.frequency, 10);
    
    let annualRate = rate;
    if (form.value.rateType === 'monthly') {
      annualRate = rate * 12;
    }
  
    let totalPrincipal = principal * Math.pow(1 + annualRate / compoundFreq, compoundFreq * years);
  
    // Contributions
    if (form.value.contributionType === 'deposit' || form.value.contributionType === 'both') {
      const depositAmount = parseFloat(form.value.depositAmount);
      const depositFreq = parseInt(form.value.depositFrequency, 10);
      const depositPeriods = years * depositFreq;
      const depositRate = Math.pow(1 + annualRate / compoundFreq, compoundFreq / depositFreq) - 1;
      
      const depositFutureValue = depositAmount * ((Math.pow(1 + depositRate, depositPeriods) - 1) / depositRate);
      totalPrincipal += depositFutureValue;
      additionalDeposit.value = depositPeriods * depositAmount;;
    }
  
    if (form.value.contributionType === 'withdrawal' || form.value.contributionType === 'both') {
      const withdrawalAmount = parseFloat(form.value.withdrawalAmount);
      const withdrawalFreq = parseInt(form.value.withdrawalFrequency, 10);
      const withdrawalPeriods = years * withdrawalFreq;
      const withdrawalRate = Math.pow(1 + annualRate / compoundFreq, compoundFreq / withdrawalFreq) - 1;
      
      const withdrawalFutureValue = withdrawalAmount * ((Math.pow(1 + withdrawalRate, withdrawalPeriods) - 1) / withdrawalRate);
      totalPrincipal -= withdrawalFutureValue;
      totalWithdrawal.value = withdrawalPeriods * withdrawalAmount;;
    }
  
    totalInterest.value = totalPrincipal - principal - (additionalDeposit.value - totalWithdrawal.value);
    futureValue.value = totalPrincipal;
    calculated.value = true;
    isLoading.value = false;
  };
  </script>
  
  



  <style scoped>
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-group-half {
    flex: 1;
  }
  
  .form-item label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  .input-field,
  .select-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #d1d5db; /* Light grey border */
    border-radius: 8px; /* Slightly rounded corners */
    box-sizing: border-box;
    font-size: 14px;
    transition: border-color 0.3s;
  }
  
  .input-field:focus,
  .select-field:focus {
    border-color: #007bff; /* Blue border on focus */
    outline: none;
  }
  
  .radio-group {
    display: flex;
    justify-content: space-between;
  }
  
  .radio-label {
    display: flex;
    align-items: center;
  }
  
  .mt-6 {
    margin-top: 24px; /* Adjust gap as needed */
  }
  
  
  .submit-button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  
  .results-container {
    margin-top: 24px; /* Adjust gap as needed */
    padding: 20px;
    border: 1px solid #e5e5e5; /* Light grey border */
    border-radius: 8px; /* Slightly rounded corners */
    background-color: #f9f9f9; /* Light background color */
  }
  </style>
  
  




