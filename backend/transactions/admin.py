from django.contrib import admin
from transactions import models


# Register your models here.
@admin.register(models.Transaction)
class OwnerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "currency",
        "amount",
        "owner",
        "timestamp",
    )


admin.site.register(models.Currency)
