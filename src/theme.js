const TInput = {
  classes: 'border-2 block w-full rounded text-gray-800',
  // Optional variants
  variants: {
    // ...
  },
  // Optional fixedClasses
  // fixedClasses: '',
}

const TButton = {
  fixedClasses: 'focus:outline-none focus:shadow-outline inline-flex items-center transition ease-in-out duration-150',
  classes: 'text-white bg-blue-600 hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
  variants: {
    error: 'text-white bg-red-600 hover:bg-red-500 focus:border-red-700  active:bg-red-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
    success: 'text-white bg-green-600 hover:bg-green-500 focus:border-green-700 active:bg-green-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
    funny: 'text-white bg-orange-600 hover:bg-orange-500 focus:border-orange-700 active:bg-orange-700 text-sm font-medium uppercase border-orange-200 px-4 py-2 border-2 rounded-full shadow',
    link: 'underline text-orange-500 px-3 py-2 hover:bg-orange-100 rounded'
  }
}

const settings = {
  TInput,
  TButton,
}

export default settings