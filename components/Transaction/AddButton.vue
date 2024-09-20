<template>
  <Dialog>
    <DialogTrigger>
      <Button>
        <Icon name="lucide:circle-plus" class="mr-2" /> Add Transaction
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Enter Your Transaction Details</DialogTitle>
        <DialogDescription>
          Please provide following details.
        </DialogDescription>
      </DialogHeader>
      <form @submit="onSubmit">
        <FormField v-slot="{ field }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input v-bind="field" placeholder="Transaction Name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field }" :control="form.control" name="amount">
          <FormItem>
            <FormLabel>Amount</FormLabel>
            <FormControl>
              <Input v-bind="field" type="number" placeholder="Enter amount" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ field }" :control="form.control" name="type">
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select v-bind="field">
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField name="date">
          <FormItem class="flex flex-col">
            <FormLabel class="mt-2">Transaction Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button variant="outline">
                    <span class="font-normal">{{
                      date ? df.format(date.toDate()) : "Pick a date"
                    }}</span>
                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                  </Button>
                  <input hidden />
                </FormControl>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model="date"
                  calendar-label="Transaction Date"
                  initial-focus
                  @update:model-value="
                    (v) => {
                      if (v) {
                        setFieldValue('date', v.toString());
                      } else {
                        setFieldValue('date', undefined);
                      }
                    }
                  "
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="mt-4 flex justify-center">
          <DialogTrigger asChild>
            <Button type="submit">Submit</Button>
          </DialogTrigger>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { DateFormatter, parseDate } from "@internationalized/date";

const date = computed({
  get: () => (values.date ? parseDate(values.date) : undefined),
  set: (val) => val,
});

const { addTransaction } = useTransactions();

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(50, {
        message: "Name must not exceed 50 characters.",
      }),
    amount: z
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .positive({
        message: "Amount must be positive",
      })
      .finite({
        message: "Amount must be finite",
      })

      .refine(
        (val) => {
          const decimalPlaces = val.toString().split(".")[1]?.length || 0;
          return decimalPlaces === 0 || decimalPlaces === 2;
        },
        {
          message: "Amount must have 0 or 2 decimal places",
        },
      ),
    type: z.enum(["investment", "savings", "expense", "income"], {
      required_error: "Please select a transaction type",
    }),
    date: z.string(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const { handleSubmit, values, setFieldValue } = form;

const onSubmit = handleSubmit((values) => {
  try {
    addTransaction(values);
    reloadNuxtApp();
  } catch (error) {
    console.log(error);
  }
});
</script>
