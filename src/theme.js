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

const TTag = {
  fixedClasses: '',
    classes: '',
    variants: {
      title: 'text-2xl leading-8 font-extrabold text-gray-900 tracking-tight',
      subtitle: 'text-lg leading-6 font-medium text-gray-900',
      error: 'text-red-500',
      badge: 'inline-flex items-center px-3 rounded-full text-xs font-medium leading-4 bg-gray-100 text-gray-800',
      avatar: 'inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-500 overflow-hidden leading-none text-center'
    }
}

const TAlert = {
  fixedClasses: {
    wrapper: 'relative flex items-center p-4 border-l-4  rounded shadow-sm',
    body: 'flex-grow',
    close: 'absolute relative flex items-center justify-center ml-4 flex-shrink-0 w-6 h-6 transition duration-100 ease-in-out rounded  focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
    closeIcon: 'fill-current h-4 w-4'
  },
  classes: {
    wrapper: 'bg-blue-50 border-blue-500',
    body: 'text-blue-700',
    close: 'text-blue-500 hover:bg-blue-200'
  },
  variants: {
    danger: {
      wrapper: 'bg-red-50 border-red-500',
      body: 'text-red-700',
      close: 'text-red-500 hover:bg-red-200'
    },
    success: {
      wrapper: 'bg-green-50 border-green-500',
      body: 'text-green-700',
      close: 'text-green-500 hover:bg-green-200'
    }
  }
}

const settings = {
  TTag,
  TTitle,
  TButton,
  TAlert
}

export default settings