<template>
  <div
    class="container container mr-auto ml-auto pl-4 pr-4 w-full md:w-[750px]"
  >
    <div class="content-inner-wrap py-[60px]">
      <div class="page-title mb-[40px]">
        <h1
          class="page-heading1 heading-center mb-[20px] text-[2.25rem] pb-[8px] text-center text-gray-900 uppercase border-b-2 border-gray-300 font-bold"
        >
          Contact Us
        </h1>
        <ul class="breadcrumb text-center p-0 m-0">
          <li
            class="pr-[15px] relative inline font-bold whitespace-no-wrap text-[0.875rem] py-[15%]"
          >
            <a href="/">Home</a>
          </li>
          <li
            class="relative inline font-bold whitespace-no-wrap text-[0.875rem] py-[15%]"
          >
            <a href="#">Our prices</a>
          </li>
        </ul>
      </div>

      <p class="font-family-play font-sans text-gray-600">
        Vestibulum tincidunt facilisis ultrices. Aliquam ullamcorper dolor et
        risus ultrices gravida. Maecenas a rutrum nunc. Integer aliquet magna
        non tellus volutpat quis pretium neque iaculis. Cras laoreet tellus a
        urna bibendum commodo iaculis ligula commodo. Aliquam dignissim viverra
        dolor sit amet condimentum. Aenean sollicitudin, justo eu pulvinar
        rutrum, felis lectus mattis purus, a auctor nunc metus gravida nam
        cursus turpis.
      </p>

      <div data-height="20" style="height: 20px"></div>

      <div class="row mb-[40px]">
        <!--Contact Left Area Start-->
        <div class="col-md-6 w-[50%] lg:w-[100%] md:w-[50%] float-left">
          <div
            class="box contact-left-area animate-fadeIn pr-[10px] mb-[30px]"
            style="opacity: 1"
          >
            <figure class="post-image">
              <img
                class="align-middle"
                src="../../../assets/images/upload/contact-image.jpg"
                alt="contact us"
              />
            </figure>

            <div data-height="35" style="height: 35px"></div>

            <p>
              Vestibulum tincidunt facilisis ultrices. Aliquam ullamcorper dolor
              et risus ultrices gravida. Maecenas a rutrum nunc. Integer aliquet
              magna non tellus volutpat quis pretium neque iaculis. Cras laoreet
              tellus a urna bibendum commodo iaculis ligula commodo. Aliquam
              dignissim viverra dolor sit amet condimentum. Aenean sollicitudin,
              justo eu pulvinar rutrum, felis lectus mattis purus, a auctor nunc
              metus.
            </p>
          </div>
        </div>
        <!--Contact Left Area End-->

        <!--Contact Right Area Start-->
        <div class="col-md-6 w-full md:w-[50%] float-left">
          <div class="box contact-right-area pl-[10px] mb-[30px]">
            <!--Contact Info Start-->
            <ul class="contact-info m-0 p-0">
              <li
                class="contact-address relative text-gray-700 text-[1.125em] mb-[16px] pl-[35px]"
              >
                559 Lilac Lane Statesboro GA USA 30458.
              </li>
              <li
                class="contact-phone relative text-gray-700 text-[1.125em] mb-[16px] pl-[35px]"
              >
                123 456 7890
              </li>
              <li
                class="contact-email relative text-gray-700 text-[1.125em] mb-[16px] pl-[35px]"
              >
                contact@domain.com
              </li>
            </ul>
            <!--Contact Info End-->

            <div data-height="43" style="height: 43px"></div>

            <!--Send Message Input Start-->
            <h3 class="page-heading3 pb-[12px] text-[1.125em] font-bold">
              Get in touch
            </h3>

            <form id="form_contact" class="submit-form contact-form">
              <div class="box text-input w-full relative mb-[30px]">
                <input
                  id="name"
                  type="text"
                  class="h-[46px] w-full bg-transparent p-[1em] border-0 text-[1em] border-b-2 border-gray-700"
                  name="name"
                  required="true"
                />
                <label>Your Name</label>
                <span></span>
              </div>
              <div class="box text-input w-full relative mb-[30px]">
                <input
                  id="email"
                  type="text"
                  class="h-[46px] w-full bg-transparent p-[1em] border-0 text-[1em] border-b-2 border-gray-700"
                  name="email"
                  required="true"
                />
                <label>Your email</label>
                <span></span>
              </div>
              <div class="box text-input w-full relative mb-[30px]">
                <input
                  id="mysubject"
                  type="text"
                  name="mysubject"
                  required="true"
                  class="h-[46px] w-full bg-transparent p-[1em] border-0 text-[1em] border-b-2 border-gray-700"
                />
                <label>Subject</label>
                <span></span>
              </div>
              <div class="box text-input textarea w-full relative mb-[30px]">
                <textarea
                  id="mymessage"
                  name="mymessage"
                  required="true"
                  class="h-[46px] w-full bg-transparent p-[1em] border-0 text-[1em] border-b-2 border-gray-700"
                ></textarea>
                <label>Your message</label>
                <span></span>
              </div>

              <!--Submit Button-->
              <div class="submit-button mt-[-6px]">
                <input
                  id="submit_message"
                  type="submit"
                  value="Send your message"
                  class="relative text-white text-sm font-bold uppercase rounded-sm w-auto h-auto bg-gray-900 px-[25px] min-h-[49px]"
                />
              </div>

              <span class="loading" style=""
                ><i class="fa fa-spinner fa-pulse"></i
              ></span>

              <div id="reply_message" style=""></div>
              <!--End-->
            </form>
            <!--Send Message Input End-->
          </div>
        </div>
        <!--Contact Right Area End-->
      </div>
    </div>
  </div>
</template>
<style>
.content-inner-wrap {
  padding: 60px 0;
}
</style>
