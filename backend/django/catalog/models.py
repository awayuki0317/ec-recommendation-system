from django.db import models


class Category(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        db_index=True,
    )
    created_at = models.DateTimeField()

    class Meta:
        db_table = "categories"
        managed = False

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        db_column="category_id",
        related_name="products",
    )
    name = models.CharField(
        max_length=255,
        db_index=True,
    )
    description = models.TextField(
        null=True,
        blank=True,
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    stock = models.IntegerField(default=0)
    image_url = models.CharField(
        max_length=500,
        null=True,
        blank=True,
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField()

    class Meta:
        db_table = "products"
        managed = False

    def __str__(self):
        return self.name