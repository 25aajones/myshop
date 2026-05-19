<section class="about-strip">
  <div class="container">
    <div class="about-strip__inner">
      <div class="about-strip__text">
        <p class="section-label">{{ section.settings.label | default: 'About Us' }}</p>
        <h2>{{ section.settings.heading | default: 'Crafting iOS experiences that last.' }}</h2>
        <p class="about-body">{{ section.settings.body | default: 'We are a small, focused team building thoughtful apps for iPhone and iPad. Every product ships with care.' }}</p>
        <a href="/pages/about" class="btn btn--outline">Learn More</a>
      </div>
      <div class="about-strip__goals">
        <p class="section-label">Goals</p>
        {% for block in section.blocks %}
          {% if block.type == 'goal' %}
            <div class="goal-item" {{ block.shopify_attributes }}>
              <span class="goal-num">0{{ forloop.index }}</span>
              <div>
                <h4>{{ block.settings.title }}</h4>
                <p>{{ block.settings.description }}</p>
              </div>
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "About Strip",
  "blocks": [
    {
      "type": "goal",
      "name": "Goal",
      "settings": [
        { "type": "text", "id": "title", "label": "Title", "default": "Ship quality apps" },
        { "type": "textarea", "id": "description", "label": "Description", "default": "Every release is polished and purposeful." }
      ]
    }
  ],
  "settings": [
    { "type": "text", "id": "label", "label": "Section Label", "default": "About Us" },
    { "type": "text", "id": "heading", "label": "Heading", "default": "Crafting iOS experiences that last." },
    { "type": "textarea", "id": "body", "label": "Body Text", "default": "We are a small, focused team building thoughtful apps." }
  ],
  "presets": [
    {
      "name": "About Strip",
      "blocks": [
        { "type": "goal" },
        { "type": "goal" },
        { "type": "goal" }
      ]
    }
  ]
}
{% endschema %}
