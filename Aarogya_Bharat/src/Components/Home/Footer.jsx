import React from 'react'

function Footer() {
  return (
    <footer class="bg-muted text-muted-foreground py-6 w-full text-white bg-[#0d6270]">
        <hr />
        <br></br>
    <div class="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
      <p class="text-sm">© 2024 Aarogya Bharat. All rights reserved.</p>
      <nav class="flex items-center gap-4 mt-4 md:mt-0">
        <a class="text-sm hover:underline" href="#" rel="ugc">
          Privacy Policy
        </a>
        <a class="text-sm hover:underline" href="#" rel="ugc">
          Terms of Service
        </a>
      </nav>
    </div>
  </footer>
  )
}

export default Footer