import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjMkEzMzJEIi8+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjgwMCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwIiB5MT0iMCIgeDI9IjEyMDAiIHkyPSI4MDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJBMzMyRCIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM1OTVFNDkiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K')"}}>
        {/* Navigation */}
        <nav className="relative z-10 flex justify-between items-center px-8 py-6">
          <div className="text-white font-header text-2xl font-bold">
            CULINARY HAVEN
          </div>
          <div className="hidden md:flex space-x-8 text-white">
            <a href="#" className="hover:text-gray-300 transition-colors">HOME</a>
            <a href="#" className="hover:text-gray-300 transition-colors">ABOUT</a>
            <a href="#" className="hover:text-gray-300 transition-colors">MENU</a>
            <a href="#" className="hover:text-gray-300 transition-colors">EVENTS</a>
            <a href="#" className="hover:text-gray-300 transition-colors">ORDER ONLINE</a>
            <button className="border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
              MAKE A RESERVATION
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-8">
          <h1 className="font-header text-6xl md:text-8xl font-bold mb-4">
            WELCOME TO CULINARY HAVEN
          </h1>
          <p className="font-body text-xl md:text-2xl mb-8 max-w-4xl">
            SAVOR THE CLASSICS. EMBRACE THE PRESENT.
          </p>
          <button className="bg-[#543F29] text-white px-8 py-4 text-lg font-semibold hover:bg-[#6B4F35] transition-colors">
            RESERVE A TABLE
          </button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="font-body text-lg text-center mb-12 max-w-4xl mx-auto leading-relaxed">
            Nestled in the heart of Charleston, South Carolina, Culinary Haven invites you to experience a dining journey that marries classic elegance with modern comfort. From the moment you step through our doors, you'll be enveloped in a warm and inviting ambiance that promises an unforgettable dining experience.
          </p>
          
          {/* Image Carousel */}
          <div className="flex justify-center items-center space-x-8 mb-8">
            <button className="text-2xl text-gray-400 hover:text-gray-600">‹</button>
            <div className="flex space-x-6">
              <div className="w-64 h-64 rounded-lg overflow-hidden" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjE1NiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRjY2NjYiLz4KPGNpcmNsZSBjeD0iMTI4IiBjeT0iMTIwIiByPSI0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K')"}}></div>
              <div className="w-64 h-64 rounded-lg overflow-hidden" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjIwIiB5PSI0MCIgd2lkdGg9IjIxNiIgaGVpZ2h0PSIxNzYiIGZpbGw9IiNEOUQ5RDkiLz4KPGNpcmNsZSBjeD0iMTI4IiBjeT0iODAiIHI9IjMwIiBmaWxsPSIjQkJCQkJCIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjE0MCIgcj0iMjAiIGZpbGw9IiNCQkJCQkIiLz4KPGNpcmNsZSBjeD0iMTU2IiBjeT0iMTQwIiByPSIyMCIgZmlsbD0iI0JCQkJCQiIvPgo8L3N2Zz4K')"}}></div>
              <div className="w-64 h-64 rounded-lg overflow-hidden" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjEyOCIgY3k9IjEyOCIgcj0iODAiIGZpbGw9IiNGRkY0RjQiLz4KPGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiByPSI2MCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjQwIiBmaWxsPSIjRkZCNkI2Ii8+Cjwvc3ZnPgo=')"}}></div>
            </div>
            <button className="text-2xl text-gray-400 hover:text-gray-600">›</button>
          </div>
        </div>
      </section>

      {/* Time-Honored Flavors Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-96 rounded-lg overflow-hidden" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNEOUQ5RDkiLz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTAwIiByPSI0MCIgZmlsbD0iI0JCQkJCQiIvPgo8Y2lyY2xlIGN4PSIzMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjQkJCQkJCIi8+CjxjaXJjbGUgY3g9IjQ1MCIgY3k9IjEwMCIgcj0iNDAiIGZpbGw9IiNCQkJCQkIiLz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMjAwIiByPSI0MCIgZmlsbD0iI0JCQkJCQiIvPgo8Y2lyY2xlIGN4PSIzMDAiIGN5PSIyMDAiIHI9IjQwIiBmaWxsPSIjQkJCQkJCIi8+CjxjaXJjbGUgY3g9IjQ1MCIgY3k9IjIwMCIgcj0iNDAiIGZpbGw9IiNCQkJCQkIiLz4KPC9zdmc+Cg==')"}}></div>
          <div className="space-y-6">
            <h2 className="font-header text-4xl font-bold text-[#2A332D]">
              TIME-HONORED FLAVORS. CONTEMPORARY TWISTS.
            </h2>
            <p className="font-body text-lg leading-relaxed">
              Our menu is a celebration of classic recipes, thoughtfully reimagined to embrace the evolving palate of the modern connoisseur. Our talented chefs infuse their creations with a touch of innovation while preserving the authenticity and essence of timeless flavors.
            </p>
            <button className="border border-[#2A332D] text-[#2A332D] px-6 py-3 hover:bg-[#2A332D] hover:text-white transition-colors">
              VIEW OUR MENU
            </button>
          </div>
        </div>
      </section>

      {/* Private Events Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <h2 className="font-header text-4xl font-bold text-[#2A332D]">
              PRIVATE EVENTS.
            </h2>
            <p className="font-body text-lg leading-relaxed">
              Looking for a distinctive venue to host a special event? Our private dining area offers a cozy and elegant space that can be customized to your unique needs, whether it's an intimate celebration or a business gathering.
            </p>
            <button className="border border-[#2A332D] text-[#2A332D] px-6 py-3 hover:bg-[#2A332D] hover:text-white transition-colors">
              VIEW PRIVATE DINING
            </button>
          </div>
          <div className="w-full h-96 rounded-lg overflow-hidden order-1 md:order-2" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNEOUQ5RDkiLz4KPHJlY3QgeD0iMTAwIiB5PSI4MCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNDAiIGZpbGw9IiM5OTk5OTkiLz4KPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTIwIiByPSIyMCIgZmlsbD0iI0JCQkJCQiIvPgo8Y2lyY2xlIGN4PSIyNTAiIGN5PSIxMjAiIHI9IjIwIiBmaWxsPSIjQkJCQkJCIi8+CjxjaXJjbGUgY3g9IjM1MCIgY3k9IjEyMCIgcj0iMjAiIGZpbGw9IiNCQkJCQkIiLz4KPGNpcmNsZSBjeD0iNDUwIiBjeT0iMTIwIiByPSIyMCIgZmlsbD0iI0JCQkJCQiIvPgo8L3N2Zz4K')"}}></div>
        </div>
      </section>

      {/* Bottom Gallery Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-6">
            <div className="w-64 h-64 rounded-lg overflow-hidden" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjMzMzMzMzIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjE1NiIgaGVpZ2h0PSIxNTYiIGZpbGw9IiNGRkZGRkYiLz4KPGNpcmNsZSBjeD0iMTI4IiBjeT0iMTAwIiByPSIyMCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxNDAiIHI9IjIwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjEyOCIgY3k9IjE4MCIgcj0iMjAiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cg==')"}}></div>
            <div className="w-64 h-64 rounded-lg overflow-hidden" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjE1NiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRjY2NjYiLz4KPGNpcmNsZSBjeD0iMTI4IiBjeT0iMTIwIiByPSI0MCIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K')"}}></div>
            <div className="w-64 h-64 rounded-lg overflow-hidden" style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjEyOCIgY3k9IjEyOCIgcj0iODAiIGZpbGw9IiNGRkY0RjQiLz4KPGNpcmNsZSBjeD0iMTI4IiBjeT0iMTI4IiByPSI2MCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjQwIiBmaWxsPSIjRkZCNkI2Ii8+Cjwvc3ZnPgo=')"}}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
