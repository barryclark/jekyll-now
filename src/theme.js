const TTitle = {
  classes: '',
  variants: {
    heading: 'text-2xl leading-8 font-semibold tracking-tight font-display text-gray-900 sm:text-3xl sm:leading-9',
    body: 'mt-2 text-base leading-6 text-gray-500',
    subtitle: 'text-base leading-6 text-indigo-600 font-semibold tracking-wide uppercase',
    badge: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800',
    link: 'text-indigo-600 hover:text-indigo-900 underline'
  }
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
  TTitle,
  TButton
}

export default settings