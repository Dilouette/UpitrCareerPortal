<template>
  <!-- Activity list (smallest breakpoint only) -->
  <div class="shadow sm:hidden">
    <ul
      role="list"
      class="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
    >
      <li v-for="transaction in transactions" :key="transaction.id">
        <a
          :href="transaction.href"
          class="block px-4 py-4 bg-white hover:bg-gray-50"
        >
          <span class="flex items-center space-x-4">
            <span class="flex-1 flex space-x-2 truncate">
              <CashIcon
                class="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span class="flex flex-col text-gray-500 text-sm truncate">
                <span class="truncate">{{ transaction.name }}</span>
                <span
                  ><span class="text-gray-900 font-medium">{{
                    transaction.amount
                  }}</span>
                  {{ transaction.currency }}</span
                >
                <time :datetime="transaction.datetime">{{
                  transaction.date
                }}</time>
              </span>
            </span>
            <ChevronRightIcon
              class="flex-shrink-0 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </a>
      </li>
    </ul>

    <nav
      class="
        bg-white
        px-4
        py-3
        flex
        items-center
        justify-between
        border-t border-gray-200
      "
      aria-label="Pagination"
    >
      <div class="flex-1 flex justify-between">
        <a
          href="#"
          class="
            relative
            inline-flex
            items-center
            px-4
            py-2
            border border-gray-300
            text-sm
            font-medium
            rounded-md
            text-gray-700
            bg-white
            hover:text-gray-500
          "
        >
          Previous
        </a>
        <a
          href="#"
          class="
            ml-3
            relative
            inline-flex
            items-center
            px-4
            py-2
            border border-gray-300
            text-sm
            font-medium
            rounded-md
            text-gray-700
            bg-white
            hover:text-gray-500
          "
        >
          Next
        </a>
      </div>
    </nav>
  </div>

  <!-- Activity table (small breakpoint and up) -->
  <div class="hidden sm:block">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col mt-2">
        <div
          class="
            align-middle
            min-w-full
            overflow-x-auto
            shadow
            overflow-hidden
            sm:rounded-lg
          "
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  class="
                    px-6
                    py-3
                    bg-gray-50
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                  scope="col"
                >
                  Transaction
                </th>
                <th
                  class="
                    px-6
                    py-3
                    bg-gray-50
                    text-right text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                  scope="col"
                >
                  Amount
                </th>
                <th
                  class="
                    hidden
                    px-6
                    py-3
                    bg-gray-50
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    md:block
                  "
                  scope="col"
                >
                  Status
                </th>
                <th
                  class="
                    px-6
                    py-3
                    bg-gray-50
                    text-right text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                  scope="col"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="transaction in transactions"
                :key="transaction.id"
                class="bg-white"
              >
                <td
                  class="
                    max-w-0
                    w-full
                    px-6
                    py-4
                    whitespace-nowrap
                    text-sm text-gray-900
                  "
                >
                  <div class="flex">
                    <a
                      :href="transaction.href"
                      class="group inline-flex space-x-2 truncate text-sm"
                    >
                      <CashIcon
                        class="
                          flex-shrink-0
                          h-5
                          w-5
                          text-gray-400
                          group-hover:text-gray-500
                        "
                        aria-hidden="true"
                      />
                      <p
                        class="text-gray-500 truncate group-hover:text-gray-900"
                      >
                        {{ transaction.name }}
                      </p>
                    </a>
                  </div>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-right
                    whitespace-nowrap
                    text-sm text-gray-500
                  "
                >
                  <span class="text-gray-900 font-medium"
                    >{{ transaction.amount }}
                  </span>
                  {{ transaction.currency }}
                </td>
                <td
                  class="
                    hidden
                    px-6
                    py-4
                    whitespace-nowrap
                    text-sm text-gray-500
                    md:block
                  "
                >
                  <span
                    :class="[
                      statusStyles[transaction.status],
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                    ]"
                  >
                    {{ transaction.status }}
                  </span>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    text-right
                    whitespace-nowrap
                    text-sm text-gray-500
                  "
                >
                  <time :datetime="transaction.datetime">{{
                    transaction.date
                  }}</time>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <nav
            class="
              bg-white
              px-4
              py-3
              flex
              items-center
              justify-between
              border-t border-gray-200
              sm:px-6
            "
            aria-label="Pagination"
          >
            <div class="hidden sm:block">
              <p class="text-sm text-gray-700">
                Showing
                {{ " " }}
                <span class="font-medium">1</span>
                {{ " " }}
                to
                {{ " " }}
                <span class="font-medium">10</span>
                {{ " " }}
                of
                {{ " " }}
                <span class="font-medium">20</span>
                {{ " " }}
                results
              </p>
            </div>
            <div class="flex-1 flex justify-between sm:justify-end">
              <a
                href="#"
                class="
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                "
              >
                Previous
              </a>
              <a
                href="#"
                class="
                  ml-3
                  relative
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                "
              >
                Next
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>