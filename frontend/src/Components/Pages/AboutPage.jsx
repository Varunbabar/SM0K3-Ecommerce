const AboutPage = () =>{
    return(
    <div className="max-w-6xl mx-auto p-10">
        <h1 className="text-3xl font-bold text-center mb-16">ABOUT SM0K3</h1>
            {/*story*/}
        <section className="mb-20" to="/story">
            <h2 className="text-2xl font-bold mb-6">OUR STORY</h2>
            <p className="text-lg leading-8 text-gray-700">
                We got tired of sneakers looking the same.

Every brand kept dropping the same white shoe, adding one new color, and calling it a revolution. So we decided to do something different.

SM0K3 wasn't born in a billion-dollar boardroom.
It wasn't inspired by "elite athletes."
And nobody spent three years researching cloud-like foam technology.

We just wanted sneakers that actually looked cool.

So we mixed bold colors, clean silhouettes, loud details, and a little bit of chaos until people started asking,

"Where did you get those?"

Mission accomplished.

Today, SM0K3 creates sneakers, laces, and limited collaborations for people who'd rather stand out than fit in.

Life's too short for boring shoes.

Wear something that starts conversations.

SM0K3.
            </p>
        </section>
        {/*carrer*/}
        <section to="/carrers">
            <h2 className="text-2xl font-bold mb-6">CARRERS</h2>
            <p className="text-lg leading-8 text-gray-700">
                We're always looking for passionate people who love
          sneakers, fashion, design, and technology.
          If you'd like to work with SM0K3, send your resume to
          careers@sm0k3.com.
            </p>
        </section>
    </div> 
    );
}
export default AboutPage;