<template>
  <div class="container mx-auto py-10">
    <div class="mb-6 space-y-4">
      <div class="flex items-center justify-between">
        <div class="w-1/3">
          <Select v-model="selectedType">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem v-for="type in filterTypes" :key="type" :value="type">
                {{ type }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TransactionAddButton />
      </div>
      <div class="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Icon name="lucide:calendar" class="mr-2 h-4 w-4" />
              {{
                dateRange.start
                  ? formatDate(dateRange.start.toDate())
                  : "Start date"
              }}
              -
              {{
                dateRange.end
                  ? formatDate(dateRange.end.toDate())
                  : "End date"
              }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <RangeCalendar
              v-model="dateRange"
              initial-focus
              @update:start-value="(startDate) => (dateRange.start = startDate)"
            />
          </PopoverContent>
        </Popover>
        <Button @click="clearDateRange" variant="ghost" size="sm">
          Clear dates
        </Button>
      </div>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>List of Transactions</CardTitle>
        <CardDescription>
          Showing {{ paginatedData.length }} of
          {{ filteredData.length }} transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table v-if="filteredData.length > 0">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead @click="sortBy('amount')" class="cursor-pointer">
                Amount
                <Icon
                  name="lucide:chevrons-up-down"
                  v-if="sortField !== 'amount'"
                  class="ml-2 inline h-4 w-4"
                />
                <Icon
                  name="lucide:chevron-up"
                  v-else-if="sortOrder === 'asc'"
                  class="ml-2 inline h-4 w-4"
                />
                <Icon
                  name="lucide:chevron-down"
                  v-else
                  class="ml-2 inline h-4 w-4"
                />
              </TableHead>
              <TableHead @click="sortBy('date')" class="cursor-pointer">
                Date
                <Icon
                  name="lucide:chevrons-up-down"
                  v-if="sortField !== 'date'"
                  class="ml-2 inline h-4 w-4"
                />
                <Icon
                  name="lucide:chevron-up"
                  v-else-if="sortOrder === 'asc'"
                  class="ml-2 inline h-4 w-4"
                />
                <Icon
                  name="lucide:chevron-down"
                  v-else
                  class="ml-2 inline h-4 w-4"
                />
              </TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="item in paginatedData" :key="item.id">
              <TableCell class="font-medium">{{ item.name }}</TableCell>
              <TableCell :class="typeToColorClass(item.type)">
                {{ formatAmount(item.amount) }}
              </TableCell>
              <TableCell>{{ formatDate(item.date) }}</TableCell>
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" class="h-8 w-8 p-0">
                      <span class="sr-only">Open menu</span>
                      <Icon name="lucide:ellipsis-vertical" class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="editItem(item)">
                      <Icon name="lucide:pencil" class="h-4 w-4 mr-2" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="deleteItem(item)">
                      <Icon name="lucide:trash-2" class="h-4 w-4 mr-2" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Card v-else class="py-10 text-center">
          <SearchXIcon class="mx-auto h-12 w-12 text-gray-400" />
          <CardHeader>
            <CardTitle>No transactions found</CardTitle>
            <CardDescription
              >Try adjusting your search or filter to find what you're looking
              for.</CardDescription
            >
          </CardHeader>
          <CardDescription>
            <Button @click="resetFilters" variant="outline"
              >Reset filters</Button
            >
          </CardDescription>
        </Card>
      </CardContent>
      <CardFooter
        v-if="filteredData.length > 0"
        className="flex items-center justify-between px-6 py-4"
      >
        <div class="flex-1 text-sm text-muted-foreground">
          Page {{ currentPage }} of {{ totalPages }}
        </div>
        <div class="flex items-center space-x-6 lg:space-x-8">
          <div class="flex items-center space-x-2">
            <p class="text-sm font-medium">Rows per page</p>
            <Select v-model="pageSize">
              <SelectTrigger class="h-8 w-[70px]">
                <SelectValue :placeholder="pageSize" />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem :value="10">10</SelectItem>
                <SelectItem :value="20">20</SelectItem>
                <SelectItem :value="30">30</SelectItem>
                <SelectItem :value="40">40</SelectItem>
                <SelectItem :value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            class="flex w-[100px] items-center justify-center text-sm font-medium"
          >
            Page {{ currentPage }} of {{ totalPages }}
          </div>
          <div class="flex items-center space-x-2">
            <Button
              variant="outline"
              class="hidden h-8 w-8 p-0 lg:flex"
              :disabled="currentPage === 1"
              @click="currentPage = 1"
            >
              <span class="sr-only">Go to first page</span>
              <Icon name="lucide:chevron-first" class="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              class="h-8 w-8 p-0"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              <span class="sr-only">Go to previous page</span>
              <Icon name="lucide:chevron-left" class="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              class="h-8 w-8 p-0"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              <span class="sr-only">Go to next page</span>
              <Icon name="lucide:chevron-right" class="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              class="hidden h-8 w-8 p-0 lg:flex"
              :disabled="currentPage === totalPages"
              @click="currentPage = totalPages"
            >
              <span class="sr-only">Go to last page</span>
              <Icon name="lucide:chevron-last" class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup>
const props = defineProps({
  transactions: {
    type: Array,
    default: [],
    required: true,
  },
});

const data = ref([]);
const sortOrder = ref("asc");
const sortField = ref("date");
const selectedType = ref("all");
const dateRange = ref({});
const currentPage = ref(1);
const pageSize = ref(10);

onMounted(async () => {
  data.value = props.transactions;
});

const formatAmount = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

const formatDate = (date) => {
  if (typeof date === "string") {
    date = new Date(Date.parse(date));
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
};

const filterTypes = ["Income", "Expense", "Investment", "Savings"];

const filteredData = computed(() => {
  let result = [...data.value];

  const selected = selectedType.value.toLowerCase();

  if (selected !== "all") {
    result = result.filter((item) => item.type === selected);
  }

  if (dateRange.value.start && dateRange.value.end) {
    const startDate = new Date(dateRange.value.start).toISOString();
    const endDate = new Date(dateRange.value.end).toISOString();

    result = result.filter((item) => {
      const date = new Date(item.date).toISOString();
      return date >= startDate && date <= endDate;
    });
  }

  result.sort((a, b) => {
    const aValue = a[sortField.value];
    const bValue = b[sortField.value];
    if (sortOrder.value === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return result;
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredData.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / pageSize.value);
});

watch(filteredData, () => {
  currentPage.value = 1;
});

watch(pageSize, () => {
  currentPage.value = 1;
});

const typeToColorClass = (type) => {
  switch (type) {
    case "income":
      return "text-green-700";
    case "savings":
      return "text-yellow-600";
    case "expense":
      return "text-red-700";
    case "investment":
      return "text-violet-700";
    default:
      return "";
  }
};

const clearDateRange = () => {
  dateRange.value = {};
};

const resetFilters = () => {
  selectedType.value = "all";
  dateRange.value = {};
  sortField.value = "date";
  sortOrder.value = "asc";
};

const editItem = (item) => {
  console.log("Edit item:", item);
};

const deleteItem = (item) => {
  console.log("Delete item:", item);
};
</script>
